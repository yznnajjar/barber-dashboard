'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Button } from '@mui/material'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import PaymentsRounded from '@mui/icons-material/PaymentsRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import PersonAddAlt1Rounded from '@mui/icons-material/PersonAddAlt1Rounded'
import AddRounded from '@mui/icons-material/AddRounded'
import { useDashboardStats } from '@/hooks/queries/useDashboardStats'
import { useBookings } from '@/hooks/queries/useBookings'
import { useActivity } from '@/hooks/queries/useActivity'
import { BOOKING_STATUS_CANCELLED } from '@/constants'
import { formatJDCompact, dayKey } from '@/lib/utils'
import PageHeader from '@/components/shared/PageHeader'
import StatCard from '@/components/shared/StatCard'
import ErrorState from '@/components/shared/ErrorState'
import BookingFormModal from '@/components/calendar/BookingFormModal'
import UpcomingAppointments from './UpcomingAppointments'
import ActivityFeed from './ActivityFeed'
import { StatGrid, ContentGrid } from './DashboardView.styled'

const ICON = { fontSize: 20 } as const

export default function DashboardView() {
  const t = useTranslations('dashboard')
  const [bookingOpen, setBookingOpen] = useState(false)
  const today = dayKey(new Date())
  const { data: stats, isLoading: statsLoading, isError } = useDashboardStats()
  const { data: bookings, isLoading: bookingsLoading } = useBookings(today)
  const { data: activity } = useActivity()

  const upcoming = useMemo(
    () =>
      (bookings ?? [])
        .filter((b) => b.status !== BOOKING_STATUS_CANCELLED)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .slice(0, 5),
    [bookings],
  )

  if (isError) return <ErrorState />

  return (
    <Box>
      <PageHeader
        title={t('title')}
        subtitle="Here's what's happening at Najjar Cuts today."
        action={<Button variant="contained" startIcon={<AddRounded />} onClick={() => setBookingOpen(true)}>{t('addBooking')}</Button>}
      />

      <StatGrid>
        <StatCard label={t('todayBookings')} value={`${stats?.todayBookings ?? 0}`} trend={stats?.bookingsTrend} loading={statsLoading} icon={<CalendarMonthRounded sx={ICON} />} />
        <StatCard label={t('todayRevenue')} value={stats ? formatJDCompact(stats.todayRevenue) : '—'} trend={stats?.revenueTrend} loading={statsLoading} icon={<PaymentsRounded sx={ICON} />} />
        <StatCard label={t('queueLength')} value={`${stats?.queueLength ?? 0}`} loading={statsLoading} icon={<GroupsRounded sx={ICON} />} />
        <StatCard label={t('newClients')} value={`${stats?.newClients ?? 0}`} trend={stats?.newClientsTrend} loading={statsLoading} icon={<PersonAddAlt1Rounded sx={ICON} />} />
      </StatGrid>

      <ContentGrid>
        <UpcomingAppointments appointments={upcoming} loading={bookingsLoading} />
        <ActivityFeed items={activity ?? []} />
      </ContentGrid>

      <BookingFormModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </Box>
  )
}
