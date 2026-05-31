'use client'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import {
  ROUTE_MWEB_DASHBOARD, ROUTE_MWEB_QUEUE, ROUTE_MWEB_CALENDAR, ROUTE_MWEB_BOOKINGS, ROUTE_MWEB_PROFILE,
} from '@/constants'
import MwebShell from '@/components/layout/mweb/MwebShell'

const TITLE_KEYS: { match: string; key: string }[] = [
  { match: ROUTE_MWEB_DASHBOARD, key: 'dashboard' },
  { match: ROUTE_MWEB_QUEUE, key: 'queue' },
  { match: ROUTE_MWEB_CALENDAR, key: 'calendar' },
  { match: ROUTE_MWEB_BOOKINGS, key: 'calendar' },
  { match: ROUTE_MWEB_PROFILE, key: 'clients' },
]

export default function MwebDashboardLayout({ children }: { children: React.ReactNode }) {
  const nav = useTranslations('nav')
  const pathname = usePathname()
  const current = TITLE_KEYS.find((t) => pathname.startsWith(t.match))?.key ?? 'dashboard'

  return <MwebShell title={nav(current)}>{children}</MwebShell>
}
