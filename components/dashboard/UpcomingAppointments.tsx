'use client'
import { useTranslations } from 'next-intl'
import { Card, Box, Typography, Button, Skeleton, Stack } from '@mui/material'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import { useRouter } from '@/i18n/routing'
import { ROUTE_QUEUE } from '@/constants'
import { formatTime12 } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import StatusChip from '@/components/shared/StatusChip'
import { CardHead, ApptRow, ApptTime } from './DashboardView.styled'
import type { Booking } from '@/types'

interface Props {
  appointments: Booking[]
  loading: boolean
}

export default function UpcomingAppointments({ appointments, loading }: Props) {
  const t = useTranslations('dashboard')
  const router = useRouter()

  return (
    <Card sx={{ p: 0 }}>
      <CardHead>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('upcoming')}</Typography>
        <Button size="small" startIcon={<GroupsRounded />} onClick={() => router.push(ROUTE_QUEUE)}>
          {t('openQueue')}
        </Button>
      </CardHead>
      <Box sx={{ px: 2.5, py: 1 }}>
        {loading
          ? [0, 1, 2, 3].map((i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ py: 1.5 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flex: 1 }}><Skeleton width="40%" /><Skeleton width="25%" /></Box>
              </Stack>
            ))
          : appointments.map((b, i) => (
              <ApptRow key={b.id} $last={i === appointments.length - 1}>
                <UserAvatar name={b.customerName} color={b.avatarColor} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{b.customerName}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{b.serviceName}</Typography>
                </Box>
                <StatusChip status={b.status} />
                <ApptTime>{formatTime12(b.startTime)}</ApptTime>
              </ApptRow>
            ))}
      </Box>
    </Card>
  )
}
