'use client'
import { useTranslations } from 'next-intl'
import { usePathname, Link } from '@/i18n/routing'
import { useAuthStore } from '@/store/authStore'
import { useQueue } from '@/hooks/queries/useQueue'
import {
  ROUTE_DASHBOARD, ROUTE_CALENDAR, ROUTE_QUEUE,
  ROUTE_SERVICES, ROUTE_STAFF, ROUTE_ANALYTICS, ROUTE_CLIENTS,
} from '@/constants'
import GridViewRounded from '@mui/icons-material/GridViewRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import BadgeRounded from '@mui/icons-material/BadgeRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded'
import UserAvatar from '@/components/shared/UserAvatar'
import {
  SidebarRoot, Brand, SectionLabel, NavItem, Spacer, OwnerCard,
} from './Sidebar.styled'

export default function Sidebar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)
  const { data: queue } = useQueue()

  const sections = [
    {
      label: t('main'),
      items: [
        { href: ROUTE_DASHBOARD, label: t('dashboard'), icon: <GridViewRounded /> },
        { href: ROUTE_CALENDAR, label: t('calendar'), icon: <CalendarMonthRounded /> },
        { href: ROUTE_QUEUE, label: t('queue'), icon: <GroupsRounded />, badge: queue?.length || undefined },
      ],
    },
    {
      label: t('manage'),
      items: [
        { href: ROUTE_SERVICES, label: t('services'), icon: <ContentCutRounded /> },
        { href: ROUTE_STAFF, label: t('staff'), icon: <BadgeRounded /> },
        { href: ROUTE_CLIENTS, label: t('clients'), icon: <PeopleAltRounded /> },
      ],
    },
    {
      label: t('insights'),
      items: [{ href: ROUTE_ANALYTICS, label: t('analytics'), icon: <InsightsRounded /> }],
    },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <SidebarRoot>
      <Brand>
        <div className="logo">B</div>
        <div>
          <div className="name">Barber</div>
          <div className="salon">Najjar Cuts · Amman</div>
        </div>
      </Brand>

      {sections.map((section) => (
        <div key={section.label}>
          <SectionLabel>{section.label}</SectionLabel>
          {section.items.map((item) => (
            <NavItem key={item.href} as={Link} href={item.href} $active={isActive(item.href)}>
              {item.icon}
              <span>{item.label}</span>
              {item.badge ? <span className="badge">{item.badge}</span> : null}
            </NavItem>
          ))}
        </div>
      ))}

      <Spacer />

      <OwnerCard>
        <UserAvatar name={user?.name ?? 'Salon Owner'} color={6} />
        <div>
          <div className="owner-name">{user?.name ?? 'Yousef Najjar'}</div>
          <div className="owner-role">Salon Owner</div>
        </div>
      </OwnerCard>
    </SidebarRoot>
  )
}
