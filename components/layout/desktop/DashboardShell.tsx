'use client'
import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'
import {
  ROUTE_DASHBOARD, ROUTE_CALENDAR, ROUTE_QUEUE, ROUTE_SERVICES,
  ROUTE_STAFF, ROUTE_ANALYTICS, ROUTE_CLIENTS, SHELL_DESKTOP,
} from '@/constants'
import Sidebar from './Sidebar'
import Header from './Header'
import AuthGate from '@/components/providers/AuthGate'
import ResponsiveGuard from '@/components/layout/mweb/ResponsiveGuard'
import RouteProgressBar from '@/components/shared/RouteProgressBar'
import { useIsMobileResolved } from '@/hooks/shared/useMediaQuery'
import { AppGrid, Content, Page } from './DashboardShell.styled'

const TITLE_KEYS: { match: string; key: string }[] = [
  { match: ROUTE_DASHBOARD, key: 'dashboard' },
  { match: ROUTE_CALENDAR, key: 'calendar' },
  { match: ROUTE_QUEUE, key: 'queue' },
  { match: ROUTE_SERVICES, key: 'services' },
  { match: ROUTE_STAFF, key: 'staff' },
  { match: ROUTE_ANALYTICS, key: 'analytics' },
  { match: ROUTE_CLIENTS, key: 'clients' },
]

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const nav = useTranslations('nav')
  const pathname = usePathname()
  const current = TITLE_KEYS.find((t) => pathname.startsWith(t.match))?.key ?? 'dashboard'
  const { isMobile, resolved } = useIsMobileResolved()

  // Hold off rendering (and all child API calls) until we know the device type.
  // ResponsiveGuard handles the actual redirect to /mweb when mobile.
  if (!resolved || isMobile) return <ResponsiveGuard target={SHELL_DESKTOP} />

  return (
    <AuthGate>
      <RouteProgressBar />
      <ResponsiveGuard target={SHELL_DESKTOP} />
      <AppGrid>
        <Sidebar />
        <Content>
          <Header title={nav(current)} />
          <Page>{children}</Page>
        </Content>
      </AppGrid>
    </AuthGate>
  )
}
