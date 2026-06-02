'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Skeleton, Snackbar, Alert } from '@mui/material'
import {
  DndContext, PointerSensor, TouchSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import { addDays, format } from 'date-fns'
import { useBookings } from '@/hooks/queries/useBookings'
import { useStaff } from '@/hooks/queries/useStaff'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { formatTime12, dayKey, timeToMinutes, minutesToTime } from '@/lib/utils'
import {
  START_HOUR, END_HOUR, PX_PER_MIN, HOURS, STRIP_DAYS, snapDeltaToMinutes, clampStartMinutes, nowPosition,
} from '@/components/calendar/calendarConfig'
import UserAvatar from '@/components/shared/UserAvatar'
import ErrorState from '@/components/shared/ErrorState'
import MwebCalendarBlock from './MwebCalendarBlock'
import MwebRescheduleSheet from './MwebRescheduleSheet'
import {
  CalTop, ToolbarRow, DateStrip, DatePill, StaffStrip, StaffChip,
  GridScroll, Grid, HourRow, NowLine, EmptyDay,
} from './MwebCalendarView.styled'
import type { Booking } from '@/types'


export default function MwebCalendarView() {
  const t = useTranslations('calendar')
  const [anchor, setAnchor] = useState<Date>(new Date())
  const [staffId, setStaffId] = useState<string | null>(null)
  const [selected, setSelected] = useState<Booking | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const { data: bookings, isLoading, isError } = useBookings(dayKey(anchor))
  const { data: staff } = useStaff()
  const reschedule = useRescheduleBooking()

  // Touch + pointer, both gated so a tap still registers as a click.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 140, tolerance: 6 } }),
  )

  // Default the staff filter to the first barber once staff loads.
  const activeStaff = staffId ?? staff?.[0]?.id ?? null

  const stripDays = useMemo(() => {
    const start = addDays(new Date(), -1)
    return Array.from({ length: STRIP_DAYS }, (_, i) => addDays(start, i))
  }, [])

  const now = new Date()
  const { nowMin, nowTop, nowInRange } = nowPosition(now)
  const isToday = dayKey(anchor) === dayKey(now)

  const dayBookings = useMemo(
    () =>
      (bookings ?? []).filter(
        (b) => b.date === dayKey(anchor) && (activeStaff ? b.staffId === activeStaff : true),
      ),
    [bookings, anchor, activeStaff],
  )

  const onDragEnd = (e: DragEndEvent) => {
    const booking = e.active.data.current?.booking as Booking | undefined
    if (!booking) return
    const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
    const deltaMin = snapDeltaToMinutes(e.delta.y)
    if (deltaMin === 0) return
    const newStart = clampStartMinutes(timeToMinutes(booking.startTime) + deltaMin, duration)
    if (newStart === timeToMinutes(booking.startTime)) return

    reschedule.mutate(
      { id: booking.id, startAt: `${booking.date}T${minutesToTime(newStart)}:00.000Z` },
      { onSuccess: () => setToast(`${booking.customerName} → ${formatTime12(minutesToTime(newStart))}`) },
    )
  }

  const saveFromSheet = (next: { id: string; startTime: string; endTime: string; staffId: string }) => {
    reschedule.mutate(
      { id: next.id, startAt: `${selected!.date}T${next.startTime}:00.000Z` },
      {
        onSuccess: () => {
          setToast(`${selected?.customerName ?? ''} → ${formatTime12(next.startTime)}`)
          setSelected(null)
        },
      },
    )
  }

  if (isError) return <ErrorState />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, margin: '-16px -16px -24px' }}>
      <CalTop>
        <ToolbarRow>
          <span className="label">{format(anchor, 'EEEE, d MMM')}</span>
          <div className="nav">
            <button className="today-btn" onClick={() => setAnchor(new Date())}>{t('today')}</button>
            <span onClick={() => setAnchor((d) => addDays(d, -1))} style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, cursor: 'pointer' }}><ChevronLeftRounded /></span>
            <span onClick={() => setAnchor((d) => addDays(d, 1))} style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, cursor: 'pointer' }}><ChevronRightRounded /></span>
          </div>
        </ToolbarRow>

        <div style={{ padding: '0 12px' }}>
          <DateStrip>
            {stripDays.map((d) => {
              const active = dayKey(d) === dayKey(anchor)
              return (
                <DatePill key={d.toISOString()} $active={active} $today={dayKey(d) === dayKey(now)} onClick={() => setAnchor(d)}>
                  <div className="dow">{format(d, 'EEE')}</div>
                  <div className="dom">{format(d, 'd')}</div>
                  <div className="dot" />
                </DatePill>
              )
            })}
          </DateStrip>

          <StaffStrip>
            {staff?.map((m) => (
              <StaffChip key={m.id} $active={m.id === activeStaff} onClick={() => setStaffId(m.id)}>
                <UserAvatar name={m.name} color={m.avatarColor} size="sm" />
                {m.name.split(' ')[0]}
              </StaffChip>
            ))}
          </StaffStrip>
        </div>
      </CalTop>

      {isLoading ? (
        <div style={{ padding: 16 }}><Skeleton variant="rounded" height={460} sx={{ borderRadius: '14px' }} /></div>
      ) : (
        <GridScroll>
          <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            <Grid>
              {HOURS.map((h) => (
                <HourRow key={h} data-label={formatTime12(`${h}:00`)} style={{ top: (h - START_HOUR) * 60 * PX_PER_MIN }} />
              ))}
              {nowInRange && isToday && <NowLine $top={nowTop} />}
              {dayBookings.map((b) => (
                <MwebCalendarBlock key={b.id} booking={b} onClick={() => setSelected(b)} />
              ))}
              {dayBookings.length === 0 && <EmptyDay>{t('noBookings')}</EmptyDay>}
            </Grid>
          </DndContext>
        </GridScroll>
      )}

      <MwebRescheduleSheet booking={selected} onClose={() => setSelected(null)} onSave={saveFromSheet} />

      <Snackbar open={!!toast} autoHideDuration={2400} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} sx={{ bottom: { xs: 96 } }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }} onClose={() => setToast(null)}>
          {toast}
        </Alert>
      </Snackbar>
    </div>
  )
}
