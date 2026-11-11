import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * template-sync.json names what every app made from this template must carry; the fleet
 * report (fleet-drift.yml) is only as good as that list and the check that reads it.
 */
const ROOT = process.cwd();
let sync: any;
const manifest = JSON.parse(readFileSync(join(ROOT, 'template-sync.json'), 'utf8'));

beforeAll(async () => {
  sync = await import(pathToFileURL(join(ROOT, 'scripts/template-sync.mjs')).href);
});

describe('template-sync.json', () => {
  it('every shared file exists here — the template is the source', () => {
    expect(manifest.shared.length).toBeGreaterThan(40);
    expect(manifest.shared.filter((f: string) => !existsSync(join(ROOT, f)))).toEqual([]);
  });

  it('every fleet file exists under fleet/, and none shadows a shared file', () => {
    expect(manifest.fleet.length).toBeGreaterThan(5);
    expect(manifest.fleet.filter((f: string) => !existsSync(join(ROOT, 'fleet', f)))).toEqual([]);
    expect(manifest.fleet.filter((f: string) => manifest.shared.includes(f))).toEqual([]);
  });

  it('every marker is present in the template itself', () => {
    for (const [file, needles] of Object.entries(manifest.markers) as [string, string[]][]) {
      const text = readFileSync(join(ROOT, file), 'utf8');
      for (const n of needles) expect(text, `${file} lacks ${n}`).toContain(n);
    }
  });

  it('every untracked app and every exception carries its reason', () => {
    for (const why of Object.values(manifest.untracked) as string[]) expect(why.trim().length).toBeGreaterThan(10);
    for (const files of Object.values(manifest.exceptions) as Record<string, string>[]) {
      for (const [file, why] of Object.entries(files)) {
        expect(manifest.shared.includes(file) || file in manifest.markers, `${file} is not checked, so excepting it means nothing`).toBe(true);
        expect(why.trim().length).toBeGreaterThan(10);
      }
    }
  });
});

describe('checkApp / applyApp', () => {
  let app: string;
  beforeAll(() => {
    app = mkdtempSync(join(tmpdir(), 'tsync-'));
    for (const f of [...manifest.shared, ...Object.keys(manifest.markers), 'package.json']) {
      cpSync(join(ROOT, f), join(app, f), { recursive: true });
    }
    for (const f of manifest.fleet) cpSync(join(ROOT, 'fleet', f), join(app, f), { recursive: true });
  });
  afterAll(() => rmSync(app, { recursive: true, force: true }));

  it('an exact copy matches', () => {
    expect(sync.checkApp({ appDir: app, repo: 'Tec-Example' })).toEqual([]);
  });

  it('finds a missing file, a changed file, a lost marker and a different version', () => {
    const shared = manifest.shared[0];
    const changed = manifest.shared[1];
    const [markerFile, needles] = Object.entries(manifest.markers)[0] as [string, string[]];
    const needle = needles[0] as string;
    unlinkSync(join(app, shared));
    writeFileSync(join(app, changed), readFileSync(join(app, changed), 'utf8') + '\n// local edit\n');
    writeFileSync(join(app, markerFile), readFileSync(join(app, markerFile), 'utf8').split(needle).join('X'));
    const pkg = JSON.parse(readFileSync(join(app, 'package.json'), 'utf8'));
    pkg.dependencies.next = '0.0.1';
    writeFileSync(join(app, 'package.json'), JSON.stringify(pkg));

    const kinds = sync.checkApp({ appDir: app, repo: 'Tec-Example' }).map((p: { kind: string; file: string }) => `${p.kind}:${p.file}`);
    expect(kinds).toEqual(expect.arrayContaining([
      `missing:${shared}`, `differs:${changed}`, `marker:${markerFile}`, 'dependency:package.json',
    ]));
  });

  it('an exception skips that file for that app only', () => {
    const changed = manifest.shared[1];
    const m = { ...manifest, exceptions: { 'Tec-Example': { [changed]: 'a reason long enough' } } };
    const files = (repo: string) => sync.checkApp({ appDir: app, repo, manifest: m }).map((p: { file: string }) => p.file);
    expect(files('Tec-Example')).not.toContain(changed);
    expect(files('Tec-Other')).toContain(changed);
  });

  it('apply restores the shared files and leaves markers and versions to a person', () => {
    const fleetFile = manifest.fleet[0];
    unlinkSync(join(app, fleetFile));
    const { copied, left } = sync.applyApp({ appDir: app, repo: 'Tec-Example' });
    expect(copied).toEqual(expect.arrayContaining([manifest.shared[0], manifest.shared[1], fleetFile]));
    expect(readFileSync(join(app, fleetFile))).toEqual(readFileSync(join(ROOT, 'fleet', fleetFile)));
    expect(left.map((p: { kind: string }) => p.kind).sort()).toEqual(['dependency', 'marker']);
  });
});

describe('fleetRepos', () => {
  it('reads the apps block of the fleet file and nothing after it', () => {
    const yaml = [
      'meta:', '  version: 2', 'apps:',
      '  - { app: Hub, repo: Tec-App, domain: hub.tecosystem.app }',
      '  # a comment', '  - { app: NBF,  repo: Tec-Nbf, domain: nbf.tecosystem.app }',
      'platform:', '  - { name: tec-core-backend, repo: Tec-core-backend }',
    ].join('\n');
    expect(sync.fleetRepos(yaml)).toEqual(['Tec-App', 'Tec-Nbf']);
  });

  it('a report on no apps is refused upstream — an empty list is not a clean fleet', () => {
    expect(sync.fleetRepos('apps:\n')).toEqual([]);
  });
});
