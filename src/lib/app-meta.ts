/**
 * This app's identity, in ONE place — the tab title, the share card (Open Graph), the
 * installable manifest and the theme colour all read it (App Excellence Standard E11).
 *
 * New app setup: change these four values. The icon is `src/app/icon.png` (or the
 * placeholder `icon.svg`) and `apple-icon.png` — Next serves them by file name (C16).
 */
export const APP_META = {
  name:        'TEC Domain',
  shortName:   'TEC',
  description: 'TEC Ecosystem — Pi Network Super App',
  /** The page background — the value of the design token `--tec-bg` (C-83 layer 1); also the browser chrome and splash colour. */
  themeColor:  '#050816',
} as const;
