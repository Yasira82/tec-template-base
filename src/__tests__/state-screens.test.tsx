/**
 * The screens every app has (App Excellence Standard E1): a broken screen offers a way
 * out and is reported; a missing page leads home; a wait is announced — each in the
 * person's language, right-to-left when it is.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';

const reportError = vi.fn();
vi.mock('@/lib/observability/reportError', () => ({ reportError: (...a: unknown[]) => reportError(...a) }));

import ErrorScreen from '@/app/error';
import NotFound from '@/app/not-found';
import Loading from '@/app/loading';
import manifest from '@/app/manifest';
import { APP_META } from '@/lib/app-meta';
import { pickLocale } from '@/lib/i18n';

const speak = (langs: string[]) => Object.defineProperty(navigator, 'languages', { value: langs, configurable: true });

afterEach(() => { cleanup(); localStorage.clear(); speak(['en-US']); reportError.mockReset(); });

describe('the error screen', () => {
  it('says what happened, reports it, and "Try again" calls reset', () => {
    const reset = vi.fn();
    render(<ErrorScreen error={Object.assign(new Error('boom'), { digest: 'd1' })} reset={reset} />);
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalledTimes(1);
    expect(reportError).toHaveBeenCalledWith(expect.any(Error), expect.objectContaining({ digest: 'd1' }));
    expect(screen.getByRole('link', { name: 'Go to home' }).getAttribute('href')).toBe('/');
  });

  it('in Arabic on an Arabic phone, right-to-left', async () => {
    speak(['ar-EG']);
    const { container } = render(<ErrorScreen error={new Error('x')} reset={vi.fn()} />);
    await waitFor(() => expect(screen.getByRole('button', { name: 'حاول مرة أخرى' })).toBeTruthy());
    expect(container.querySelector('main')?.getAttribute('dir')).toBe('rtl');
  });
});

describe('not found and loading', () => {
  it('a missing page leads home', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Go to home' }).getAttribute('href')).toBe('/');
  });

  it('a wait is announced to screen readers, not a blank page', () => {
    render(<Loading />);
    const s = screen.getByRole('status');
    expect(s.getAttribute('aria-busy')).toBe('true');
    expect(s.getAttribute('aria-label')).toBe('Loading');
  });
});

describe('which language', () => {
  it('a saved choice wins, then the browser, then English — an unknown language is English', () => {
    speak(['ko-KR']);
    expect(pickLocale()).toBe('ko');
    localStorage.setItem('tec_locale', 'fr');
    expect(pickLocale()).toBe('fr');
    localStorage.clear(); speak(['xx-YY']);
    expect(pickLocale()).toBe('en');
  });
});

describe('the installable manifest', () => {
  it('names the app and its icon from lib/app-meta.ts', () => {
    const m = manifest();
    expect(m.name).toBe(APP_META.name);
    expect(m.short_name).toBe(APP_META.shortName);
    expect(m.theme_color).toBe(APP_META.themeColor);
    expect(m.icons?.[0]?.src).toBe('/icon.svg');
  });
});
