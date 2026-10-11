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

  it('the template passes the screens, the twelve languages and the manifest (S1)', () => {
    const floor = JSON.parse(readFileSync('.app-scorecard.json', 'utf8')).required as string[];
    for (const id of ['E1', 'E3', 'E11']) expect(floor).toContain(id);
    const byId = Object.fromEntries(run().results.map((x: { id: string; pass: boolean }) => [x.id, x.pass]));
    expect(byId.E1 && byId.E3 && byId.E11).toBe(true);
  });
});
