#!/usr/bin/env node
/**
 * Template sync — keeps every app made from this template carrying the template's fixes.
 *
 * Why it exists: on 11 Nov 2026 a fix went to 16 apps by hand and two more (NBF, Brookfield)
 * were missed — and so had been every change for weeks, the Pi sign-in door included. The
 * other direction happened too: Zone and Life fixed the arrival report (re-send after ten
 * minutes) and the template and 16 apps never got it. A rule that lives in some apps and not
 * the others is a rule the fleet does not have.
 *
 * What must match is written down ONCE, in `template-sync.json`:
 *   shared        files every app carries byte for byte
 *   markers       fixes inside files each app customises (the text must be there)
 *   dependencies  versions that must equal the template's (next, react, …)
 *   untracked     fleet apps not made from this template, each with its reason
 *   exceptions    per-app files that differ on purpose, each with its reason
 *
 *   node scripts/template-sync.mjs check <app-dir> [--repo <Repo>]   exit 1 when the app has drifted
 *   node scripts/template-sync.mjs apply <app-dir> [--repo <Repo>]   copy the shared files in; print what is left
 *   node scripts/template-sync.mjs fleet [--workdir <dir>] [--out <report.md>]
 *        clone every app in the KB's fleet list (architecture/app-fleet.yaml) and check it.
 *        An app not under `untracked` is checked, so a new app is covered from the day it
 *        joins the fleet. Writes the report and the number of drifted apps (<out>.count).
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

export const TEMPLATE_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const loadManifest = (templateDir = TEMPLATE_DIR) =>
  JSON.parse(readFileSync(join(templateDir, 'template-sync.json'), 'utf8'));

const readOrNull = (p) => { try { return readFileSync(p); } catch { return null; } };

const depVersion = (dir, name) => {
  const raw = readOrNull(join(dir, 'package.json'));
  if (!raw) return undefined;
  const pkg = JSON.parse(raw.toString('utf8'));
  return pkg.dependencies?.[name] ?? pkg.devDependencies?.[name];
};

/**
 * Every way `appDir` differs from the template, as a list of problems.
 * A file listed under the app's exceptions is skipped — and only that file.
 */
export function checkApp({ templateDir = TEMPLATE_DIR, appDir, repo = '', manifest = loadManifest(templateDir) }) {
  const skip = manifest.exceptions?.[repo] ?? {};
  const problems = [];

  for (const file of manifest.shared) {
    if (skip[file]) continue;
    const want = readFileSync(join(templateDir, file));
    const have = readOrNull(join(appDir, file));
    if (have === null) problems.push({ kind: 'missing', file });
    else if (!have.equals(want)) problems.push({ kind: 'differs', file });
  }

  for (const [file, needles] of Object.entries(manifest.markers ?? {})) {
    if (skip[file]) continue;
    const have = readOrNull(join(appDir, file));
    if (have === null) { problems.push({ kind: 'missing', file }); continue; }
    const text = have.toString('utf8');
    for (const needle of needles) {
      if (!text.includes(needle)) problems.push({ kind: 'marker', file, detail: needle });
    }
  }

  for (const name of manifest.dependencies ?? []) {
    const want = depVersion(templateDir, name);
    const have = depVersion(appDir, name);
    if (want !== have) problems.push({ kind: 'dependency', file: 'package.json', detail: `${name}: ${have ?? '(none)'} → ${want}` });
  }

  return problems;
}

/** Copy every shared file the app lacks or differs on. Markers and versions are left to a person. */
export function applyApp({ templateDir = TEMPLATE_DIR, appDir, repo = '', manifest = loadManifest(templateDir) }) {
  const copied = [];
  for (const p of checkApp({ templateDir, appDir, repo, manifest })) {
    if ((p.kind === 'missing' || p.kind === 'differs') && manifest.shared.includes(p.file)) {
      mkdirSync(dirname(join(appDir, p.file)), { recursive: true });
      copyFileSync(join(templateDir, p.file), join(appDir, p.file));
      copied.push(p.file);
    }
  }
  return { copied, left: checkApp({ templateDir, appDir, repo, manifest }) };
}

/** The repos of the fleet's apps, in the order the fleet file lists them. */
export function fleetRepos(yamlText) {
  const block = yamlText.split(/\n(?=\S)/).find((b) => b.startsWith('apps:')) ?? '';
  return [...block.matchAll(/^\s*-\s*\{[^}]*\brepo:\s*([A-Za-z0-9._-]+)/gm)].map((m) => m[1]);
}

const describe = (p) => ({
  missing:    `missing \`${p.file}\``,
  differs:    `\`${p.file}\` differs from the template`,
  marker:     `\`${p.file}\` lacks \`${p.detail}\``,
  dependency: `\`${p.detail}\``,
  clone:      `could not be cloned — ${p.detail}`,
}[p.kind]);

export function renderReport(results, manifest) {
  const drifted = results.filter((r) => r.problems.length);
  const lines = [
    '# Fleet drift — apps behind the template',
    '',
    `Checked by \`scripts/template-sync.mjs fleet\` against \`template-sync.json\` (${manifest.shared.length} shared files, ` +
      `${Object.keys(manifest.markers ?? {}).length} files with markers, ${(manifest.dependencies ?? []).length} pinned versions).`,
    '',
    drifted.length
      ? `**${drifted.length} of ${results.length} apps have drifted.** To bring one back: \`node scripts/template-sync.mjs apply <app-dir> --repo <Repo>\` from a clone of the template, then fix what it prints, run the app's tests, and open one PR.`
      : `**All ${results.length} apps match the template.**`,
    '',
    '| App | Problems |',
    '|---|---|',
    ...results.map((r) => `| ${r.repo} | ${r.problems.length || '✅'} |`),
    '',
  ];
  for (const r of drifted) {
    lines.push(`## ${r.repo}`, '', ...r.problems.slice(0, 60).map((p) => `- ${describe(p)}`));
    if (r.problems.length > 60) lines.push(`- … and ${r.problems.length - 60} more`);
    lines.push('');
  }
  const untracked = Object.entries(manifest.untracked ?? {});
  if (untracked.length) {
    lines.push('## Not tracked', '', ...untracked.map(([repo, why]) => `- ${repo} — ${why}`), '');
  }
  let text = lines.join('\n');
  // An issue body holds 65,536 characters; a report that does not fit must say so, not vanish.
  if (text.length > 60_000) text = text.slice(0, 60_000) + '\n\n… report cut at 60,000 characters — run `fleet` locally for all of it.\n';
  return text;
}

async function fleet({ workdir, out }) {
  const manifest = loadManifest();
  const res = await fetch(manifest.fleet);
  if (!res.ok) throw new Error(`fleet list: HTTP ${res.status} from ${manifest.fleet}`);
  const repos = fleetRepos(await res.text());
  if (repos.length === 0) throw new Error('fleet list: no apps found — refusing to report a clean fleet');

  mkdirSync(workdir, { recursive: true });
  const results = [];
  for (const repo of repos) {
    if (manifest.untracked?.[repo]) continue;
    const dir = join(workdir, repo);
    rmSync(dir, { recursive: true, force: true });
    try {
      execFileSync('git', ['clone', '--quiet', '--depth', '1', `https://github.com/${manifest.owner}/${repo}.git`, dir], { stdio: 'pipe' });
    } catch (e) {
      results.push({ repo, problems: [{ kind: 'clone', file: '', detail: String(e.stderr || e.message).trim().split('\n')[0] }] });
      continue;
    }
    results.push({ repo, problems: checkApp({ appDir: dir, repo, manifest }) });
  }

  const report = renderReport(results, manifest);
  const drifted = results.filter((r) => r.problems.length).length;
  if (out) { writeFileSync(out, report); writeFileSync(`${out}.count`, String(drifted)); }
  else process.stdout.write(report);
  console.error(`fleet: ${results.length} apps checked, ${drifted} drifted`);
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const [cmd, ...rest] = process.argv.slice(2);
  const opt = (name) => { const i = rest.indexOf(name); return i >= 0 ? rest[i + 1] : undefined; };
  const appDir = rest[0] && !rest[0].startsWith('--') ? resolve(rest[0]) : undefined;
  const repo = opt('--repo') ?? '';

  if (cmd === 'check' && appDir) {
    const problems = checkApp({ appDir, repo });
    for (const p of problems) console.log(`- ${describe(p)}`);
    console.log(problems.length ? `${problems.length} problem(s)` : 'matches the template');
    process.exit(problems.length ? 1 : 0);
  } else if (cmd === 'apply' && appDir) {
    const { copied, left } = applyApp({ appDir, repo });
    for (const f of copied) console.log(`copied ${f}`);
    for (const p of left) console.log(`left: ${describe(p)}`);
    process.exit(0);
  } else if (cmd === 'fleet') {
    fleet({ workdir: opt('--workdir') ?? join(tmpdir(), 'tec-fleet'), out: opt('--out') })
      .catch((e) => { console.error(String(e.message || e)); process.exit(1); });
  } else {
    console.error('usage: template-sync.mjs check|apply <app-dir> [--repo <Repo>] | fleet [--workdir <dir>] [--out <file>]');
    process.exit(2);
  }
}
