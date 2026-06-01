'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Button, Skeleton } from '@mui/material'
import AddRounded from '@mui/icons-material/AddRounded'
import { useStaff } from '@/hooks/queries/useStaff'
import { useServices } from '@/hooks/queries/useServices'
import PageHeader from '@/components/shared/PageHeader'
import ErrorState from '@/components/shared/ErrorState'
import StaffCard from './StaffCard'
import StaffProfileDrawer from './StaffProfileDrawer'
import { StaffGrid } from './StaffView.styled'
import type { StaffMember, WorkingDay } from '@/types'

const DAYS: WorkingDay['day'][] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const blankStaff = (): StaffMember => ({
  id: '', name: '', name_ar: '', avatarColor: 1, role: 'Barber', services: [],
  workingHours: DAYS.map((day) => ({ day, enabled: day !== 'Fri', start: '09:00', end: '18:00' })),
})

export default function StaffView() {
  const t = useTranslations('staff')
  const { data: staff, isLoading, isError } = useStaff()
  const { data: services } = useServices()
  const [selected, setSelected] = useState<StaffMember | null>(null)

  const serviceName = (id: string) => services?.find((s) => s.id === id)?.name ?? id

  if (isError) return <ErrorState />

  return (
    <Box>
      <PageHeader
        title={t('title')}
        subtitle={`${staff?.length ?? 0} team members`}
        action={<Button variant="outlined" startIcon={<AddRounded />} onClick={() => setSelected(blankStaff())}>{t('addStaff')}</Button>}
      />

      <StaffGrid>
        {isLoading
          ? [0, 1, 2, 3].map((i) => <Skeleton key={i} variant="rounded" height={200} />)
          : staff?.map((m) => (
              <StaffCard key={m.id} member={m} serviceName={serviceName} onClick={() => setSelected(m)} />
            ))}
      </StaffGrid>

      <StaffProfileDrawer member={selected} services={services ?? []} onClose={() => setSelected(null)} />
    </Box>
  )
}
