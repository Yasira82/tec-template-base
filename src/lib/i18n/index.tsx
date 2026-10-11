'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LOCALE_CODES, isLocaleCode, localeInfo, type LocaleCode } from '@/lib/locales';
import { en, type Translations } from './en';
import { ar } from './ar';
import { zh } from './zh';
import { vi } from './vi';
import { ko } from './ko';
import { id } from './id';
import { hi } from './hi';
import { es } from './es';
import { pt } from './pt';
import { fr } from './fr';
import { tr } from './tr';
import { ru } from './ru';

/**
 * The twelve dictionaries (App Excellence Standard E3) — same keys in every one;
 * `i18n-parity.test.ts` fails the build when a key is missing anywhere.
 */
export const DICTIONARIES: Record<LocaleCode, Translations> = { en, ar, zh, vi, ko, id, hi, es, pt, fr, tr, ru };

const STORAGE_KEY = 'tec_locale';

/**
 * The person's language, outside React context too — the error and not-found
 * screens render when the providers may not have. Their saved choice first, then
 * the browser's languages, then English. Never throws (storage can be blocked).
 */
export function pickLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocaleCode(saved)) return saved;
  } catch { /* ignore — storage blocked in this context; fall through to the browser */ }
  const langs = (typeof navigator !== 'undefined' && (navigator.languages?.length ? navigator.languages : [navigator.language])) || [];
  for (const l of langs) {
    const base = String(l ?? '').toLowerCase().split('-')[0];
    if (isLocaleCode(base)) return base;
  }
  return 'en';
}

export const dirOf = (code: LocaleCode): 'ltr' | 'rtl' => localeInfo(code).dir;

/**
 * The person's dictionary WITHOUT the provider — for screens that render outside it
 * (error, not found, help). English on the server and the first paint, theirs after
 * mount, so the server and the first client render agree.
 */
export function useDict(): { t: Translations; lang: LocaleCode; dir: 'ltr' | 'rtl' } {
  const [lang, setLang] = useState<LocaleCode>('en');
  useEffect(() => { setLang(pickLocale()); }, []);
  return { t: DICTIONARIES[lang], lang, dir: dirOf(lang) };
}

interface LocaleContextValue {
  locale:    LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  t:         Translations;
  dir:       'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>('en');

  useEffect(() => { setLocaleState(pickLocale()); }, []);

  const setLocale = (next: LocaleCode) => {
    if (!LOCALE_CODES.includes(next)) return;
    setLocaleState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore — the choice applies to this visit */ }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: DICTIONARIES[locale], dir: dirOf(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useTranslation must be used within LocaleProvider');
  return context;
}
