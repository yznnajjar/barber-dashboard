import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { LOCALE_EN, LOCALE_AR, DEFAULT_LOCALE } from '@/constants'

export const routing = defineRouting({
  locales: [LOCALE_EN, LOCALE_AR],
  defaultLocale: DEFAULT_LOCALE,
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
