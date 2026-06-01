'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Drawer, Box, Typography, IconButton, Divider, Button } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useCancelBooking } from '@/hooks/mutations/useCancelBooking'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { timeStringToDate, buildStartAt, getBookingDetailRows } from '@/lib/utils'
import { BOOKING_STATUS_CANCELLED } from '@/constants'
import UserAvatar from '@/components/shared/UserAvatar'
import StatusChip from '@/components/shared/StatusChip'
import { DrawerHead } from './CalendarView.styled'
import { CustomerRow, DetailRows, DetailRow, DetailLabel, DetailValue, RescheduleBox, ActionsRow } from './AppointmentDetailDrawer.styled'
import type { Booking } from '@/types'

export default function AppointmentDetailDrawer({ booking, onClose }: { booking: Booking | null; onClose: () => void }) {
  const t = useTranslations('calendar')
  const cancel = useCancelBooking()
  const reschedule = useRescheduleBooking()
  const [rescheduleAt, setRescheduleAt] = useState<Date | null>(null)

  if (!booking) return <Drawer anchor="right" open={false} onClose={onClose} />

  const rows = getBookingDetailRows(booking)

  const saveReschedule = () => {
    if (!rescheduleAt) return
    reschedule.mutate(
      { id: booking.id, startAt: buildStartAt(booking.date, rescheduleAt) },
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
        <CustomerRow>
          <UserAvatar name={booking.customerName} color={booking.avatarColor} size="lg" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3">{booking.customerName}</Typography>
            <StatusChip status={booking.status} />
          </Box>
        </CustomerRow>

        <DetailRows>
          {rows.map(([label, value]) => (
            <DetailRow key={label}>
              <DetailLabel>{label}</DetailLabel>
              <DetailValue>{value}</DetailValue>
            </DetailRow>
          ))}
        </DetailRows>

        {rescheduleAt !== null && (
          <RescheduleBox>
            <TimePicker label={t('reschedule')} value={rescheduleAt} onChange={(d) => d && setRescheduleAt(d)} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
            <Button fullWidth variant="contained" sx={{ mt: 1.5 }} disabled={reschedule.isPending} onClick={saveReschedule}>Save new time</Button>
          </RescheduleBox>
        )}

        <Divider sx={{ my: 2.5 }} />

        <ActionsRow>
          <Button variant="outlined" fullWidth onClick={() => setRescheduleAt(timeStringToDate(booking.startTime))}>
            {t('reschedule')}
          </Button>
          <Button
            variant="outlined" color="error" fullWidth
            disabled={booking.status === BOOKING_STATUS_CANCELLED || cancel.isPending}
            onClick={() => cancel.mutate(booking.id, { onSuccess: onClose })}
          >
            {t('cancelBooking')}
          </Button>
        </ActionsRow>
      </Box>
    </Drawer>
  )
}
