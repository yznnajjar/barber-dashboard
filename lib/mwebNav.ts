import { LOCALE_EN, LOCALE_AR, DEFAULT_LOCALE, MWEB_LANG_PARAM } from '@/constants'

export type AppLocale = typeof LOCALE_EN | typeof LOCALE_AR

const SUPPORTED: AppLocale[] = [LOCALE_EN, LOCALE_AR]

/** Narrow an arbitrary string to a supported locale, falling back to default. */
export function normalizeLocale(value: string | null | undefined): AppLocale {
  return SUPPORTED.includes(value as AppLocale) ? (value as AppLocale) : DEFAULT_LOCALE
}

/** Build an mweb href that carries the locale as `?lang=`: /mweb/login?lang=en */
export function mwebHref(path: string, locale: string): string {
  const lang = normalizeLocale(locale)
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}${MWEB_LANG_PARAM}=${lang}`
}

/** Text direction for a locale. */
export function dirForLocale(locale: string): 'ltr' | 'rtl' {
  return normalizeLocale(locale) === LOCALE_AR ? 'rtl' : 'ltr'
}
