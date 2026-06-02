'use client'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { useMwebRouter } from '@/hooks/shared/useMwebRouter'
import { Skeleton } from '@mui/material'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import PaymentsRounded from '@mui/icons-material/PaymentsRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import PersonAddAlt1Rounded from '@mui/icons-material/PersonAddAlt1Rounded'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import { useDashboardStats } from '@/hooks/queries/useDashboardStats'
import { useBookings } from '@/hooks/queries/useBookings'
import { useQueue } from '@/hooks/queries/useQueue'
import { BOOKING_STATUS_CANCELLED, ROUTE_MWEB_QUEUE, ROUTE_MWEB_BOOKINGS } from '@/constants'
import { formatJDCompact, formatTime12, formatDuration, dayKey } from '@/lib/utils'
import StatCard from '@/components/shared/StatCard'
import StatusChip from '@/components/shared/StatusChip'
import UserAvatar from '@/components/shared/UserAvatar'
import ErrorState from '@/components/shared/ErrorState'
import { SectionHead } from '@/components/layout/mweb/MwebShell.styled'
import {
  Greeting, StatGrid, HeroCard, OpenChip, RowList, TimePill,
} from './MwebDashboardView.styled'

const ICON = { fontSize: 20 } as const

export default function MwebDashboardView() {
  const t = useTranslations('dashboard')
  const tn = useTranslations('nav')
  const tc = useTranslations('common')
  const { push } = useMwebRouter()

  const { data: stats, isLoading: statsLoading, isError } = useDashboardStats()
  const { data: bookings, isLoading: bookingsLoading } = useBookings(dayKey(new Date()))
  const { data: queue, isLoading: queueLoading } = useQueue()

  const upcoming = useMemo(
    () =>
      (bookings ?? [])
        .filter((b) => b.status !== BOOKING_STATUS_CANCELLED)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .slice(0, 4),
    [bookings],
  )

  const next = queue?.[0]

  if (isError) return <ErrorState />

  return (
    <>
      <Greeting>
        <div>
          <div className="sub">{t('title')}</div>
          <h1>Najjar Cuts</h1>
        </div>
        <OpenChip>Open</OpenChip>
      </Greeting>

      <StatGrid>
        <StatCard size="sm" label={t('todayBookings')} value={`${stats?.todayBookings ?? 0}`} trend={stats?.bookingsTrend} loading={statsLoading} icon={<CalendarMonthRounded sx={ICON} />} />
        <StatCard size="sm" label={t('todayRevenue')} value={stats ? formatJDCompact(stats.todayRevenue) : '—'} trend={stats?.revenueTrend} loading={statsLoading} icon={<PaymentsRounded sx={ICON} />} />
        <StatCard size="sm" label={t('queueLength')} value={`${stats?.queueLength ?? 0}`} loading={statsLoading} icon={<GroupsRounded sx={ICON} />} />
        <StatCard size="sm" label={t('newClients')} value={`${stats?.newClients ?? 0}`} trend={stats?.newClientsTrend} loading={statsLoading} icon={<PersonAddAlt1Rounded sx={ICON} />} />
      </StatGrid>

      {/* Up next (live queue head) */}
      <div>
        <SectionHead><span className="label">{tn('queue')}</span></SectionHead>
        {queueLoading ? (
          <Skeleton variant="rounded" height={120} sx={{ borderRadius: '16px' }} />
        ) : next ? (
          <HeroCard onClick={() => push(ROUTE_MWEB_QUEUE)} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <UserAvatar name={next.customerName} color={next.avatarColor} size="lg" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{next.customerName}</h2>
                  <span className="next-chip">NEXT</span>
                </div>
                <div className="meta"><ContentCutRounded sx={{ fontSize: 15 }} />{next.serviceName} · {formatDuration(next.estimatedWait)}</div>
                <div className="wait">{tc('today')}</div>
              </div>
            </div>
          </HeroCard>
        ) : (
          <RowList><div className="item" style={{ justifyContent: 'center', color: 'var(--ink-40)' }}>—</div></RowList>
        )}
      </div>

      {/* Today's schedule */}
      <div>
        <SectionHead>
          <span className="label">{t('upcoming')}</span>
          <button className="link" onClick={() => push(ROUTE_MWEB_BOOKINGS)}>{tc('viewAll')}</button>
        </SectionHead>
        {bookingsLoading ? (
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: '14px' }} />
        ) : (
          <RowList>
            {upcoming.map((b) => (
              <div className="item" key={b.id} onClick={() => push(ROUTE_MWEB_BOOKINGS)}>
                <TimePill>
                  <div className="t">{formatTime12(b.startTime).split(' ')[0]}</div>
                  <div className="p">{formatTime12(b.startTime).split(' ')[1]}</div>
                </TimePill>
                <div className="grow">
                  <div className="name">{b.customerName}</div>
                  <div className="svc">{b.serviceName}</div>
                </div>
                <StatusChip status={b.status} />
              </div>
            ))}
          </RowList>
        )}
      </div>
    </>
  )
}
