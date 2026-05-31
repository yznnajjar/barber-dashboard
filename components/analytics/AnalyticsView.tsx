'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Tabs, Tab } from '@mui/material'
import PaymentsRounded from '@mui/icons-material/PaymentsRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import PersonAddAlt1Rounded from '@mui/icons-material/PersonAddAlt1Rounded'
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded'
import { useAnalytics } from '@/hooks/queries/useAnalytics'
import { MOCK_SALON_ID } from '@/constants'
import { formatJDCompact } from '@/lib/utils'
import PageHeader from '@/components/shared/PageHeader'
import StatCard from '@/components/shared/StatCard'
import ErrorState from '@/components/shared/ErrorState'
import RevenueChart from './RevenueChart'
import TopServicesCard from './TopServicesCard'
import BusyHoursHeatmap from './BusyHoursHeatmap'
import TopClientsCard from './TopClientsCard'
import { StatGrid, ChartGrid } from './AnalyticsLayout.styled'
import type { AnalyticsPeriod } from '@/types'

const ICON = { fontSize: 20 } as const

export default function AnalyticsView() {
  const t = useTranslations('analytics')
  const [period, setPeriod] = useState<AnalyticsPeriod>('week')
  const { data, isLoading, isError } = useAnalytics(MOCK_SALON_ID, period)

  if (isError) return <ErrorState />

  return (
    <Box>
      <PageHeader title={t('title')} />

      <Tabs
        value={period}
        onChange={(_, v) => setPeriod(v)}
        sx={{ mb: 3, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
      >
        <Tab value="today" label={t('today')} />
        <Tab value="week" label={t('week')} />
        <Tab value="month" label={t('month')} />
      </Tabs>

      <StatGrid>
        <StatCard size="sm" loading={isLoading} label={t('totalRevenue')} value={data ? formatJDCompact(data.totalRevenue) : '—'} icon={<PaymentsRounded sx={ICON} />} />
        <StatCard size="sm" loading={isLoading} label={t('totalBookings')} value={`${data?.totalBookings ?? 0}`} icon={<CalendarMonthRounded sx={ICON} />} />
        <StatCard size="sm" loading={isLoading} label={t('avgValue')} value={data ? formatJDCompact(data.avgBookingValue) : '—'} icon={<TrendingUpRounded sx={ICON} />} />
        <StatCard size="sm" loading={isLoading} label={t('newClients')} value={`${data?.newClients ?? 0}`} icon={<PersonAddAlt1Rounded sx={ICON} />} />
      </StatGrid>

      <ChartGrid>
        <RevenueChart series={data?.revenueSeries} loading={isLoading} />
        <TopServicesCard services={data?.topServices} loading={isLoading} />
      </ChartGrid>

      <ChartGrid>
        <BusyHoursHeatmap heatmap={data?.heatmap} loading={isLoading} />
        <TopClientsCard clients={data?.topClients} loading={isLoading} />
      </ChartGrid>
    </Box>
  )
}
