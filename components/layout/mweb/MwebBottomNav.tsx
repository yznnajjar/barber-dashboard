'use client'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueue } from '@/hooks/queries/useQueue'
import {
  ROUTE_MWEB_DASHBOARD, ROUTE_MWEB_QUEUE,
  ROUTE_MWEB_CALENDAR, ROUTE_MWEB_PROFILE, MWEB_LANG_PARAM,
} from '@/constants'
import { mwebHref, normalizeLocale } from '@/lib/mwebNav'
import GridViewRounded from '@mui/icons-material/GridViewRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import PersonRounded from '@mui/icons-material/PersonRounded'
import { PwaBottomNav, NavTab } from './MwebShell.styled'

export default function MwebBottomNav() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const params = useSearchParams()
  const locale = normalizeLocale(params.get(MWEB_LANG_PARAM))
  const { data: queue } = useQueue()

  const tabs = [
    { href: ROUTE_MWEB_DASHBOARD, label: t('dashboard'), icon: <GridViewRounded sx={{ fontSize: 22 }} /> },
    { href: ROUTE_MWEB_QUEUE, label: t('queue'), icon: <GroupsRounded sx={{ fontSize: 22 }} />, badge: queue?.length || undefined },
    { href: ROUTE_MWEB_CALENDAR, label: t('calendar'), icon: <CalendarMonthRounded sx={{ fontSize: 22 }} /> },
    { href: ROUTE_MWEB_PROFILE, label: t('clients'), icon: <PersonRounded sx={{ fontSize: 22 }} /> },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <PwaBottomNav>
      {tabs.map((tab) => (
        <NavTab as={Link} key={tab.href} href={mwebHref(tab.href, locale)} $active={isActive(tab.href)}>
          <span className="ico-wrap">
            {tab.icon}
            {tab.badge ? <span className="badge">{tab.badge}</span> : null}
          </span>
          {tab.label}
        </NavTab>
      ))}
    </PwaBottomNav>
  )
}
