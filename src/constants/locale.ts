export const SUPPORTED_LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;
export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

const RTL_LOCALES: readonly string[] = ['ar'];

export function isRtl(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}

export function direction(locale: string): Direction {
  return isRtl(locale) ? DIRECTION.RTL : DIRECTION.LTR;
}
