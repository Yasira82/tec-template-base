#!/usr/bin/env node
/**
 * tec doctor — fleet conformance against THIS template.
 *
 *   node scripts/doctor.mjs ../Tec-Life ../Tec-Zone ...
 *   node scripts/doctor.mjs --all ..            # every sibling that looks like a TEC app
 *
 * ── What this is for, and what it is NOT ────────────────────────────────────────
 *
 * Each app's own CI already checks that app against the RULES (CSRF in middleware only,
 * ADR-007 guards, `amount` as a number, no Railway host in the bundle). This asks a
 * different question that nothing asks today:
 *
 *     Has this app back-adopted what the template learned since it was cloned?
 *
 * That is the platform's single most repeated failure. Session 46 states it plainly: *a
 * rule existed, one repo followed it, and nobody back-adopted it — so the platform
 * diverged quietly for months.* A clone is a photograph of the template on one day, and
 * nothing has ever gone back to look.
 *
 * ── Three rules this tool obeys ─────────────────────────────────────────────────
 *
 * 1. IT REPORTS; IT NEVER FIXES. A fixer run unattended across 24 repos is how one wrong
 *    assumption becomes 24 wrong commits. Session 27's fleet sweep was deliberately
 *    fail-closed for the same reason — it skipped any file whose anchors did not match.
 *
 * 2. EVERY FINDING NAMES THE INCIDENT IT COMES FROM. A report that says "drift" teaches
 *    nothing and gets ignored. One that says "this is the caret trap that froze 18 apps
 *    out of the palette for months" tells you why the line matters.
 *
 * 3. A CHECK THAT CANNOT BE EVALUATED SAYS `UNKNOWN`, NEVER `PASS`. A missing file is not
 *    a satisfied rule. This platform has been bitten repeatedly by the opposite — a
 *    deploy step that logged "not found" and exited 0 reported success for months while
 *    deploying nothing.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';

const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return null; } };
const json = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };

/** The major this template currently builds against — read, never hardcoded twice. */
const TEMPLATE_ROOT = resolve(new URL('..', import.meta.url).pathname);
const templatePkg   = json(join(TEMPLATE_ROOT, 'package.json')) ?? { dependencies: {} };

const PASS = 'PASS', FAIL = 'FAIL', UNKNOWN = 'UNKNOWN', WAIVED = 'WAIVED';

/**
 * Decisions, not oversights.
 *
 * A conformance tool that reports a deliberate decision as a failure gets closed. That is
 * the permanently-red-check lesson from Session 46 in a new costume: three repos would
 * show FAIL on every run forever, and the twenty-third time somebody sees it they stop
 * reading the other findings too.
 *
 * So a waiver is first-class — and it must carry a REASON and where the decision was
 * taken, never just a repo name. A waiver nobody can audit is how a real regression hides
 * behind a stale exemption.
 */
const EXCEPTIONS = {
  'Tec-Assets':    { 'tec-ui-range': 'Session 46 — 104 hardcoded hexes; a re-skin, not an upgrade. Deliberate, recorded.' },
  'Tec-Commerce':  { 'tec-ui-range': 'Session 46 — 149 hardcoded hexes; a re-skin, not an upgrade. Deliberate, recorded.' },
  'Tec-Ecommerce': { 'tec-ui-range': 'Session 46 — 202 hardcoded hexes; a re-skin, not an upgrade. Deliberate, recorded.' },
};

/**
 * Every check: an id, the incident that earned it, and a function returning
 * { status, detail }. `app` is the repo root; `isTemplate` exempts the checks whose
 * "violation" is the template's whole job (it IS the placeholder).
 */
const CHECKS = [
  {
    id: 'tec-ui-range',
    because: 'Session 46 — 18 apps sat on ^1.1.0, which can NEVER resolve a 2.x. They were '
           + 'frozen out of the palette from the day v2.0.0 shipped, and `npm update` did '
           + 'exactly what it was told, forever, while nothing warned.',
    run(app, { isTemplate, fleetMajor }) {
      const pkg = json(join(app, 'package.json'));
      if (!pkg) return { status: UNKNOWN, detail: 'no package.json' };
      const range = (pkg.dependencies ?? {})['@yasser172/tec-ui'];
      if (!range) return { status: UNKNOWN, detail: 'does not depend on @yasser172/tec-ui' };

      const majorOf = (r) => Number(String(r).replace(/^[^0-9]*/, '').split('.')[0]);
      const have = majorOf(range);

      // The template is the baseline every app is measured against — which means
      // comparing it to itself always passes, and its own drift is the one thing this
      // tool would be structurally blind to. It was: the template sat on ^1.1.0 while 23
      // repos had moved to ^3.0.0, so every app cloned from it was born frozen out of the
      // palette. So the template is measured against the FLEET instead.
      const target = isTemplate ? fleetMajor : majorOf(templatePkg.dependencies?.['@yasser172/tec-ui']);
      if (!Number.isFinite(have) || !Number.isFinite(target)) {
        return { status: UNKNOWN, detail: `cannot compare "${range}"` };
      }
      if (have >= target) return { status: PASS, detail: range };
      return {
        status: FAIL,
        detail: isTemplate
          ? `${range} cannot resolve ${target}.x — the FLEET has moved past the template, so every new app is born behind`
          : `${range} cannot resolve ${target}.x — the template is on ^${target}.x`,
      };
    },
  },
  {
    id: 'lockfile-agrees',
    because: 'A range and its lockfile can disagree silently. `npm install` quietly resolves the '
           + 'range and moves on, so the committed lock keeps pinning a version the range no '
           + 'longer permits — and the app runs whatever was installed last, not what the range '
           + 'says. This check was added because bumping the template to ^3.0.0 left its own lock '
           + 'pinned at 1.2.1, and nothing would have said so.',
    run(app) {
      const pkg  = json(join(app, 'package.json'));
      const lock = json(join(app, 'package-lock.json'));
      if (!pkg)  return { status: UNKNOWN, detail: 'no package.json' };
      if (!lock) return { status: UNKNOWN, detail: 'no package-lock.json committed' };

      const range = (pkg.dependencies ?? {})['@yasser172/tec-ui'];
      if (!range) return { status: UNKNOWN, detail: 'does not depend on @yasser172/tec-ui' };

      const installed = lock.packages?.['node_modules/@yasser172/tec-ui']?.version;
      if (!installed) return { status: UNKNOWN, detail: 'tec-ui absent from the lockfile' };

      const majorOf = (v) => Number(String(v).replace(/^[^0-9]*/, '').split('.')[0]);
      return majorOf(installed) === majorOf(range)
        ? { status: PASS, detail: `range ${range} · locked ${installed}` }
        : { status: FAIL, detail: `range ${range} but the lock pins ${installed} — run npm install and commit the lock` };
    },
  },
  {
    id: 'api-ready',
    because: 'IIC 1.3 — /api/health must ALWAYS answer 200 (a liveness check that fails under '
           + 'load reported the platform down during NEW-W, and the false alarm WAS the outage '
           + 'people saw). So readiness is a second endpoint that is allowed, and required, to fail.',
    run(app) {
      const p = join(app, 'src/app/api/ready/route.ts');
      return existsSync(p)
        ? { status: PASS, detail: 'src/app/api/ready/route.ts' }
        : { status: FAIL, detail: 'no /api/ready — health cannot both always-answer and gate a rollout' };
    },
  },
  {
    id: 'pro-parser',
    because: 'Session 26/27 — a per-app BFF read `.data.plan` instead of `.data.subscription.plan`, '
           + 'silently resolved FREE, and locked Pro OFF for every paying user across the fleet. The '
           + 'unit tests mocked a FLAT shape and green-lit it.',
    run(app) {
      const p = join(app, 'src/app/api/bff/subscription/route.ts');
      const src = read(p);
      if (src === null) return { status: UNKNOWN, detail: 'no /api/bff/subscription route' };
      if (/resolveProStatus|resolveProState/.test(src)) {
        return { status: PASS, detail: 'imports the canonical resolver' };
      }

      // A route that never READS the upstream body cannot misparse it. Tec-Life is
      // exactly this — a proxy that forwards commerce's answer untouched — and the first
      // version of this check called it a hand-rolled parser. That was the tool doing the
      // thing it exists to prevent: reporting a violation it had not verified. A
      // conformance report that cries wolf is one people learn to close, which is the
      // same lesson as the permanently-red Dependabot check.
      //
      // `.json()` with NO arguments is a body READ; `NextResponse.json(payload, …)` is a
      // write and carries arguments, so it does not match.
      const parsesUpstream = /\.json\(\s*\)/.test(src) || /\.data\.(subscription|plan)\b/.test(src);
      if (!parsesUpstream) {
        return { status: PASS, detail: 'pass-through — never reads the envelope, so it cannot misparse it' };
      }

      return /\.data\.plan\b/.test(src)
        ? { status: FAIL, detail: 'reads .data.plan (FLAT) — the exact misparse that locked Pro OFF' }
        : { status: FAIL, detail: 'hand-rolled parser — import resolveProStatus instead of re-deriving the shape' };
    },
  },
  {
    id: 'app-identity',
    because: 'Session 46 — 15 SSO landings still said "TEC App", on the one screen where a user '
           + 'decides whether to trust the app they just tapped.',
    skipTemplate: true,
    run(app) {
      const src = read(join(app, 'src/app/api/auth/sso-callback/route.ts'));
      if (src === null) return { status: UNKNOWN, detail: 'no sso-callback route' };
      return /🔷 TEC App|>TEC App</.test(src)
        ? { status: FAIL, detail: 'the SSO landing still introduces itself as the template' }
        : { status: PASS, detail: 'names itself' };
    },
  },
  {
    id: 'app-source',
    because: 'Leaving APP_SOURCE as the template default makes Mode-2 approve fail with Pi 404 '
           + 'payment_not_found — payment-service resolves PI_API_KEY_<SOURCE> (KB C-12 §11).',
    skipTemplate: true,
    run(app) {
      const src = read(join(app, 'src/lib/app-source.ts'));
      if (src === null) return { status: UNKNOWN, detail: 'no src/lib/app-source.ts' };
      const m = src.match(/APP_SOURCE\s*=\s*['"]([^'"]+)['"]/);
      if (!m) return { status: UNKNOWN, detail: 'APP_SOURCE not found in the file' };
      return m[1] === 'app'
        ? { status: FAIL, detail: "APP_SOURCE is still 'app' — the template default" }
        : { status: PASS, detail: m[1] };
    },
  },
  {
    id: 'dependabot-majors',
    because: 'Session 46 — without an ignore block the standing group PR bumped typescript to ^7 '
           + 'and eslint-config-next to 16 on a Next 15 platform. Next 15 does not recognise '
           + 'TypeScript 7 as a TypeScript install at all, so a permanent red check followed each '
           + 'repo — which is how a CI signal teaches people to ignore it. 112 PRs were closed.',
    run(app) {
      const src = read(join(app, '.github/dependabot.yml'));
      if (src === null) return { status: UNKNOWN, detail: 'no .github/dependabot.yml' };
      return /version-update:semver-major/.test(src)
        ? { status: PASS, detail: 'majors ignored' }
        : { status: FAIL, detail: 'no major-ignore — this repo will be handed unmergeable PRs' };
    },
  },
  {
    id: 'hub-url-literal',
    because: 'July 2026 System incident — NEXT_PUBLIC_HUB_URL held the placeholder `C_HUB_URL`, so '
           + 'the login and Mode-1 payment redirect target became `C_HUB_URL/hub` → 404. '
           + 'NEXT_PUBLIC_* is inlined at BUILD time, so it survived until a redeploy.',
    run(app) {
      // Only committed env files — the real values live in Vercel and are not readable here.
      const files = ['.env.example', '.env.local.example', '.env.production'].map((f) => join(app, f));
      const present = files.filter(existsSync);
      if (!present.length) return { status: UNKNOWN, detail: 'no committed env example to read' };
      for (const f of present) {
        const m = (read(f) ?? '').match(/^NEXT_PUBLIC_(?:HUB|APP)_URL\s*=\s*(.+)$/m);
        if (m && m[1].trim() && !/^https?:\/\//.test(m[1].trim())) {
          return { status: FAIL, detail: `${basename(f)}: ${m[0].trim()} is not an https URL` };
        }
      }
      return { status: PASS, detail: 'no non-URL placeholder committed' };
    },
  },
];

/** A directory that looks like a TEC app built from this template. */
const looksLikeApp = (dir) =>
  existsSync(join(dir, 'package.json')) && existsSync(join(dir, 'src/app'));

function collect(args) {
  const allIdx = args.indexOf('--all');
  if (allIdx === -1) return args.map((a) => resolve(a));
  const root = resolve(args[allIdx + 1] ?? '..');
  return readdirSync(root)
    .map((d) => join(root, d))
    .filter(looksLikeApp)
    .sort();
}

const targets = collect(process.argv.slice(2));
if (!targets.length) {
  console.error('usage: node scripts/doctor.mjs <app-dir>... | --all <parent-dir>');
  process.exit(2);
}

/**
 * The highest tec-ui major any scanned app resolves — what the FLEET has actually
 * adopted, as opposed to what the template says. Used only to measure the template
 * itself; see the tec-ui-range check for why it cannot be measured against itself.
 */
const fleetMajor = Math.max(0, ...targets
  .filter((a) => resolve(a) !== TEMPLATE_ROOT)
  .map((a) => {
    const r = json(join(a, 'package.json'))?.dependencies?.['@yasser172/tec-ui'];
    const n = Number(String(r ?? '').replace(/^[^0-9]*/, '').split('.')[0]);
    return Number.isFinite(n) ? n : 0;
  }));

const rows = [];
for (const app of targets) {
  const name = basename(app);
  const isTemplate = resolve(app) === TEMPLATE_ROOT;
  for (const check of CHECKS) {
    if (check.skipTemplate && isTemplate) continue;   // the template IS the placeholder
    const { status, detail } = check.run(app, { isTemplate, fleetMajor });
    const waiver = EXCEPTIONS[name]?.[check.id];
    // A waiver only ever downgrades a FAIL. It can never turn a PASS into something
    // else, and it never suppresses an UNKNOWN — an exemption for a check that could
    // not run is an exemption for a question nobody asked.
    if (status === FAIL && waiver) {
      rows.push({ app: name, check: check.id, status: WAIVED, detail: waiver, because: check.because });
    } else {
      rows.push({ app: name, check: check.id, status, detail, because: check.because });
    }
  }
}

const width = Math.max(...rows.map((r) => r.app.length), 12);
const mark  = { PASS: '✅', FAIL: '❌', UNKNOWN: '· ', WAIVED: '⊘ ' };

let lastApp = null;
for (const r of rows) {
  if (r.app !== lastApp) { console.log(`\n${r.app}`); lastApp = r.app; }
  console.log(`  ${mark[r.status]} ${r.check.padEnd(20)} ${r.detail}`);
}

const failing = rows.filter((r) => r.status === FAIL);
const unknown = rows.filter((r) => r.status === UNKNOWN);
const waived  = rows.filter((r) => r.status === WAIVED);

console.log(`\n${'─'.repeat(width + 46)}`);
console.log(`${targets.length} apps · ${rows.length} checks · ${failing.length} FAIL · `
          + `${waived.length} waived · ${unknown.length} UNKNOWN`);

// Group the failures BY CHECK, not by app. A fleet-wide drift is one decision to make
// once, not twenty-one identical ones to rediscover repo by repo.
const byCheck = new Map();
for (const r of failing) {
  if (!byCheck.has(r.check)) byCheck.set(r.check, { because: r.because, apps: [] });
  byCheck.get(r.check).apps.push(r.app);
}
for (const [id, { because, apps }] of [...byCheck].sort((a, b) => b[1].apps.length - a[1].apps.length)) {
  console.log(`\n❌ ${id} — ${apps.length} app(s)`);
  console.log(`   ${because}`);
  console.log(`   ${apps.join(' · ')}`);
}

// Non-zero on any FAIL, so this can gate later without being rewritten.
process.exit(failing.length ? 1 : 0);
