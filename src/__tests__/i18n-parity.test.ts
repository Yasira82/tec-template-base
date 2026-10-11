/**
 * Twelve languages, the same keys in every one (App Excellence Standard E3).
 *
 * A key present in English and missing in Korean renders `undefined` on a Korean
 * phone — no error anywhere, just a blank button. This fails the build instead.
 */
import { describe, it, expect } from 'vitest';
import { DICTIONARIES } from '@/lib/i18n';
import { LOCALES, LOCALE_CODES } from '@/lib/locales';

const paths = (o: unknown, prefix = ''): string[] =>
  o && typeof o === 'object'
    ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k))
    : [prefix];
const get = (o: unknown, path: string) => path.split('.').reduce<unknown>((a, k) => (a as Record<string, unknown>)?.[k], o);

describe('the twelve dictionaries', () => {
  it('there is one dictionary per locale in the fleet list — twelve, no more, no less', () => {
    expect(LOCALES).toHaveLength(12);
    expect(Object.keys(DICTIONARIES).sort()).toEqual([...LOCALE_CODES].sort());
  });

  const reference = paths(DICTIONARIES.en).sort();
  for (const code of LOCALE_CODES) {
    it(`${code}: the same keys as English, every value a non-empty string`, () => {
      expect(paths(DICTIONARIES[code]).sort()).toEqual(reference);
      for (const p of reference) {
        const v = get(DICTIONARIES[code], p);
        expect(typeof v, `${code}.${p}`).toBe('string');
        expect((v as string).trim(), `${code}.${p}`).not.toBe('');
      }
    });
  }

  it('Arabic reads right-to-left; the others left-to-right', () => {
    for (const l of LOCALES) expect(l.dir).toBe(l.code === 'ar' ? 'rtl' : 'ltr');
  });
});
