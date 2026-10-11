/**
 * The App Excellence scorecard runs, and this app keeps every check it has passed.
 * CI runs the same script; this keeps it honest locally (`npm test`).
 */
import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const run = (...a: string[]) => JSON.parse(execFileSync('node', ['scripts/app-scorecard.mjs', '--json', ...a], { encoding: 'utf8' }));

describe('the App Excellence scorecard', () => {
  it('nothing in the floor has regressed', () => {
    const r = run();
    expect(r.regressed).toEqual([]);
  });

  it('the template passes EVERY check — a new app starts at 100 %', () => {
    const all = ['E1', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14'];
    const floor = JSON.parse(readFileSync('.app-scorecard.json', 'utf8')).required as string[];
    expect([...floor].sort()).toEqual([...all].sort());
    const failing = run().results.filter((x: { pass: boolean }) => !x.pass).map((x: { id: string }) => x.id);
    expect(failing).toEqual([]);
  });
});
