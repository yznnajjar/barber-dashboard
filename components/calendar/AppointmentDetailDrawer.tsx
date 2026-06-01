'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Drawer, Box, Typography, IconButton, Divider, Stack, Button } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { useCancelBooking } from '@/hooks/mutations/useCancelBooking'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { useUpdateBookingStatus } from '@/hooks/mutations/useUpdateBookingStatus'
import { getBookingDetailRows, buildStartAt, timeStringToDate } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import StatusChip from '@/components/shared/StatusChip'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import CancelBookingDialog from './CancelBookingDialog'
import { DrawerHead } from './CalendarView.styled'
import { BOOKING_STATUS_NEXT, BOOKING_STATUS_NEXT_LABEL_KEY, BOOKING_STATUS_TERMINAL } from '@/constants'
import type { Booking, BookingStatus } from '@/types'

export default function AppointmentDetailDrawer({ booking, onClose }: { booking: Booking | null; onClose: () => void }) {
  const t = useTranslations('calendar')
  const cancel = useCancelBooking()
  const reschedule = useRescheduleBooking()
  const updateStatus = useUpdateBookingStatus()
  const [rescheduleAt, setRescheduleAt] = useState<Date | null>(null)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [confirmNoShow, setConfirmNoShow] = useState(false)

  if (!booking) return <Drawer anchor="right" open={false} onClose={onClose} />

  const rows = getBookingDetailRows(booking)
  const next = BOOKING_STATUS_NEXT[booking.status]
  const isTerminal = BOOKING_STATUS_TERMINAL.includes(booking.status)

  const saveReschedule = () => {
    if (!rescheduleAt) return
    reschedule.mutate(
      { id: booking.id, startAt: buildStartAt(booking.date, rescheduleAt) },
      { onSuccess: () => { setRescheduleAt(null); onClose() } },
    )
  }

  const applyStatus = (status: BookingStatus) => {
    updateStatus.mutate({ id: booking.id, status })
  }

  const close = () => { setRescheduleAt(null); onClose() }

  return (
    <Drawer anchor="right" open={!!booking} onClose={close} PaperProps={{ sx: { width: 440 } }}>
      <DrawerHead>
        <Typography variant="h3" sx={{ flex: 1 }}>{t('details')}</Typography>
        <IconButton onClick={close}><CloseRounded /></IconButton>
      </DrawerHead>

      <Box sx={{ p: 3 }}>
        {/* Client header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <UserAvatar name={booking.customerName} color={booking.avatarColor} size="lg" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3">{booking.customerName}</Typography>
            <StatusChip status={booking.status} />
          </Box>
        </Box>

        {/* Details */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          {rows.map(([label, value]) => (
            <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{label}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
            </Box>
          ))}
        </Stack>

        {/* Status action bar — primary action + secondary row */}
        {!isTerminal && (
          <>
            <Divider sx={{ my: 2 }} />

            {next && (
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mb: 1.5 }}
                disabled={updateStatus.isPending}
                onClick={() => applyStatus(next)}
              >
                {t(BOOKING_STATUS_NEXT_LABEL_KEY[next])}
              </Button>
            )}

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setRescheduleAt(timeStringToDate(booking.startTime))}
              >
                {t('reschedule')}
              </Button>
              <Button
                variant="outlined"
                color="warning"
                fullWidth
                onClick={() => setConfirmNoShow(true)}
              >
                {t('noShow')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => setConfirmCancel(true)}
              >
                {t('cancelBooking')}
              </Button>
            </Box>
          </>
        )}

        {/* Reschedule section */}
        {rescheduleAt !== null && (
          <Box sx={{ mt: 2 }}>
            <TimePicker label={t('reschedule')} value={rescheduleAt} onChange={(d) => d && setRescheduleAt(d)} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
            <Button fullWidth variant="contained" sx={{ mt: 1.5 }} disabled={reschedule.isPending} onClick={saveReschedule}>
              {t('saveReschedule')}
            </Button>
          </Box>
        )}
      </Box>

      <CancelBookingDialog
        open={confirmCancel}
        clientName={booking.customerName}
        onConfirm={(reason) => { cancel.mutate({ id: booking.id, reason }); setConfirmCancel(false) }}
        onClose={() => setConfirmCancel(false)}
      />

      <ConfirmDialog
        open={confirmNoShow}
        title={t('noShowTitle')}
        message={t('noShowMessage', { name: booking.customerName })}
        confirmLabel={t('noShow')}
        danger
        onConfirm={() => { applyStatus('NO_SHOW'); setConfirmNoShow(false) }}
        onClose={() => setConfirmNoShow(false)}
      />
    </Drawer>
  )
}
