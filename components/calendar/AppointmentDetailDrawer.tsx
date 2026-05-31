'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Drawer, Box, Typography, IconButton, Divider, Stack, Button } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useCancelBooking } from '@/hooks/mutations/useCancelBooking'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { formatTime12, formatDuration, timeToMinutes, minutesToTime, timeStringToDate, dateToTimeString } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import StatusChip from '@/components/shared/StatusChip'
import { DrawerHead } from './CalendarView.styled'
import type { Booking } from '@/types'

export default function AppointmentDetailDrawer({ booking, onClose }: { booking: Booking | null; onClose: () => void }) {
  const t = useTranslations('calendar')
  const cancel = useCancelBooking()
  const reschedule = useRescheduleBooking()
  const [rescheduleAt, setRescheduleAt] = useState<Date | null>(null)

  if (!booking) return <Drawer anchor="right" open={false} onClose={onClose} />

  const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
  const rows: [string, string][] = [
    ['Service', booking.serviceName],
    ['Time', `${formatTime12(booking.startTime)} – ${formatTime12(booking.endTime)}`],
    ['Duration', formatDuration(duration)],
    ['Deposit', booking.depositPaid ? 'Paid' : 'Not paid'],
  ]

  const saveReschedule = () => {
    if (!rescheduleAt) return
    const startMin = rescheduleAt.getHours() * 60 + rescheduleAt.getMinutes()
    reschedule.mutate(
      { id: booking.id, startTime: minutesToTime(startMin), endTime: minutesToTime(startMin + duration) },
      { onSuccess: () => { setRescheduleAt(null); onClose() } },
    )
  }

  return (
    <Drawer anchor="right" open={!!booking} onClose={() => { setRescheduleAt(null); onClose() }} PaperProps={{ sx: { width: 440 } }}>
      <DrawerHead>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('details')}</Typography>
        <IconButton onClick={() => { setRescheduleAt(null); onClose() }}><CloseRounded /></IconButton>
      </DrawerHead>

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <UserAvatar name={booking.customerName} color={booking.avatarColor} size="lg" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3">{booking.customerName}</Typography>
            <StatusChip status={booking.status} />
          </Box>
        </Box>

        <Stack spacing={1.5}>
          {rows.map(([label, value]) => (
            <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{label}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
            </Box>
          ))}
        </Stack>

        {rescheduleAt !== null && (
          <Box sx={{ mt: 2.5 }}>
            <TimePicker label={t('reschedule')} value={rescheduleAt} onChange={(d) => d && setRescheduleAt(d)} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
            <Button fullWidth variant="contained" sx={{ mt: 1.5 }} disabled={reschedule.isPending} onClick={saveReschedule}>Save new time</Button>
          </Box>
        )}

        <Divider sx={{ my: 2.5 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" fullWidth onClick={() => setRescheduleAt(timeStringToDate(booking.startTime))}>
            {t('reschedule')}
          </Button>
          <Button
            variant="outlined" color="error" fullWidth
            disabled={booking.status === 'CANCELLED' || cancel.isPending}
            onClick={() => cancel.mutate(booking.id, { onSuccess: onClose })}
          >
            {t('cancelBooking')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
