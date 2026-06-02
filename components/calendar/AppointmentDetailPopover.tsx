'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Popover, Box, Button, Menu, MenuItem } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded'
import ScheduleRounded from '@mui/icons-material/ScheduleRounded'
import ContentCutRounded from '@mui/icons-material/ContentCutRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'
import { useCancelBooking } from '@/hooks/mutations/useCancelBooking'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { useUpdateBookingStatus } from '@/hooks/mutations/useUpdateBookingStatus'
import { buildStartAt, timeStringToDate, formatTime12, formatJD, timeToMinutes } from '@/lib/utils'
import { STATUS_COLORS } from '@/lib/colors'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import CancelBookingDialog from './CancelBookingDialog'
import {
  ApopStrip, ApopBody, ApopHead, ApopSvc, ApopPrice, ApopMeta,
  ApopActs, ApopMore, ApopMenuItem, StatusPillBtn, apopPaperSx,
} from './CalendarView.styled'
import { BOOKING_STATUS_TERMINAL } from '@/constants'
import type { Booking, BookingStatus } from '@/types'

const STATUS_ORDER: BookingStatus[] = [
  'PENDING', 'CONFIRMED', 'ARRIVED', 'STARTED', 'COMPLETED', 'NO_SHOW', 'CANCELLED',
]

interface Props {
  booking: Booking | null
  anchorEl: HTMLElement | null
  price?: number
  staffName?: string
  onClose: () => void
}

export default function AppointmentDetailPopover({ booking, anchorEl, price, staffName, onClose }: Props) {
  const t = useTranslations('calendar')
  const cancel = useCancelBooking()
  const reschedule = useRescheduleBooking()
  const updateStatus = useUpdateBookingStatus()
  const [rescheduleAt, setRescheduleAt] = useState<Date | null>(null)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [confirmNoShow, setConfirmNoShow] = useState(false)
  const [statusMenuEl, setStatusMenuEl] = useState<HTMLElement | null>(null)

  const open = Boolean(booking && anchorEl)
  const status = booking ? STATUS_COLORS[booking.status] : null
  const isTerminal = booking ? BOOKING_STATUS_TERMINAL.includes(booking.status) : false
  const duration = booking ? timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime) : 0

  const close = () => { setRescheduleAt(null); setStatusMenuEl(null); onClose() }

  const applyStatus = (next: BookingStatus) => {
    if (!booking) return
    updateStatus.mutate({ id: booking.id, status: next })
    setStatusMenuEl(null)
  }

  const saveReschedule = () => {
    if (!booking || !rescheduleAt) return
    reschedule.mutate(
      { id: booking.id, startAt: buildStartAt(booking.date, rescheduleAt) },
      { onSuccess: () => { setRescheduleAt(null); close() } },
    )
  }

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { ...apopPaperSx, ml: 1 } } }}
      >
        {booking && status && (
          <>
            <ApopStrip $bg={status.fg} />
            <ApopBody>
              <ApopHead>
                <ApopSvc>{booking.serviceName}</ApopSvc>
                {price != null && <ApopPrice>{formatJD(price)}</ApopPrice>}
              </ApopHead>

              <Box sx={{ mt: 1.25 }}>
                <StatusPillBtn
                  $bg={status.bg}
                  $fg={status.fg}
                  onClick={(e) => setStatusMenuEl(e.currentTarget)}
                >
                  {status.label}
                  <KeyboardArrowDownRounded sx={{ fontSize: 15, ml: 0.25 }} />
                </StatusPillBtn>
              </Box>

              <ApopMeta>
                <div className="row"><PersonOutlineRounded /> {booking.customerName}</div>
                <div className="row"><ScheduleRounded /> {formatTime12(booking.startTime)}–{formatTime12(booking.endTime)} · {duration} min</div>
                {staffName && <div className="row"><ContentCutRounded /> {staffName}</div>}
              </ApopMeta>

              {!isTerminal && (
                <ApopActs>
                  <Button
                    variant="outlined"
                    onClick={() => setRescheduleAt(timeStringToDate(booking.startTime))}
                  >
                    {t('reschedule')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => setConfirmNoShow(true)}
                  >
                    {t('noShow')}
                  </Button>
                </ApopActs>
              )}

              {rescheduleAt !== null && (
                <Box sx={{ mt: 1.5 }}>
                  <TimePicker
                    label={t('reschedule')}
                    value={rescheduleAt}
                    onChange={(d) => d && setRescheduleAt(d)}
                    slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                  />
                  <Button fullWidth variant="contained" sx={{ mt: 1.5 }} disabled={reschedule.isPending} onClick={saveReschedule}>
                    {t('saveReschedule')}
                  </Button>
                </Box>
              )}
            </ApopBody>

            {!isTerminal && (
              <ApopMore>
                <ApopMenuItem $danger onClick={() => setConfirmCancel(true)}>
                  <CloseRounded /> {t('cancelBooking')}
                </ApopMenuItem>
              </ApopMore>
            )}
          </>
        )}
      </Popover>

      <Menu anchorEl={statusMenuEl} open={Boolean(statusMenuEl)} onClose={() => setStatusMenuEl(null)}>
        {STATUS_ORDER.map((s) => (
          <MenuItem key={s} selected={booking?.status === s} onClick={() => applyStatus(s)}>
            {STATUS_COLORS[s].label}
          </MenuItem>
        ))}
      </Menu>

      {booking && (
        <>
          <CancelBookingDialog
            open={confirmCancel}
            clientName={booking.customerName}
            onConfirm={(reason) => { cancel.mutate({ id: booking.id, reason }); setConfirmCancel(false); close() }}
            onClose={() => setConfirmCancel(false)}
          />
          <ConfirmDialog
            open={confirmNoShow}
            title={t('noShowTitle')}
            message={t('noShowMessage', { name: booking.customerName })}
            confirmLabel={t('noShow')}
            danger
            onConfirm={() => { applyStatus('NO_SHOW'); setConfirmNoShow(false); close() }}
            onClose={() => setConfirmNoShow(false)}
          />
        </>
      )}
    </>
  )
}
