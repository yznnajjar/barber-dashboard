'use client'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Box, Button, ToggleButtonGroup, ToggleButton, IconButton, Skeleton, Snackbar, Alert,
} from '@mui/material'
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  type DragStartEvent, type DragEndEvent,
} from '@dnd-kit/core'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import AddRounded from '@mui/icons-material/AddRounded'
import { addDays, startOfWeek, format } from 'date-fns'
import { useBookings } from '@/hooks/queries/useBookings'
import { useStaff } from '@/hooks/queries/useStaff'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { MOCK_SALON_ID } from '@/constants'
import { formatTime12, formatDuration, dayKey, timeToMinutes, minutesToTime } from '@/lib/utils'
import { blockColors } from './calendarConfig'
import {
  START_HOUR, END_HOUR, PX_PER_MIN, HOURS, snapDeltaToMinutes, clampStartMinutes,
} from './calendarConfig'
import PageHeader from '@/components/shared/PageHeader'
import UserAvatar from '@/components/shared/UserAvatar'
import ErrorState from '@/components/shared/ErrorState'
import BookingFormDrawer from './BookingFormDrawer'
import AppointmentBlock from './AppointmentBlock'
import AppointmentDetailDrawer from './AppointmentDetailDrawer'
import DroppableColumn from './DroppableColumn'
import {
  CalWrap, HeaderRow, Body, TimeCol, TimeSlot, RowBg, CurrentLine, Toolbar, ToolbarLabel, ApptGhost,
} from './CalendarView.styled'
import type { Booking } from '@/types'

export default function CalendarView() {
  const t = useTranslations('calendar')
  const [view, setView] = useState<'day' | 'week'>('day')
  const [anchor, setAnchor] = useState<Date>(new Date())
  const [selected, setSelected] = useState<Booking | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [dragging, setDragging] = useState<Booking | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const { data: bookings, isLoading, isError } = useBookings(MOCK_SALON_ID)
  const { data: staff } = useStaff(MOCK_SALON_ID)
  const reschedule = useRescheduleBooking()

  // Require a few px of movement before a drag starts, so a click still opens the drawer.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor, { weekStartsOn: 0 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [anchor])

  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const nowTop = (nowMin - START_HOUR * 60) * PX_PER_MIN
  const nowInRange = nowMin >= START_HOUR * 60 && nowMin <= END_HOUR * 60

  const step = (dir: number) => setAnchor((d) => addDays(d, dir * (view === 'week' ? 7 : 1)))
  const dayBookings = (key: string, staffId?: string) =>
    (bookings ?? []).filter((b) => b.date === key && (staffId ? b.staffId === staffId : true))

  const onDragStart = (e: DragStartEvent) => {
    setDragging((e.active.data.current?.booking as Booking) ?? null)
  }

  const onDragEnd = (e: DragEndEvent) => {
    const booking = e.active.data.current?.booking as Booking | undefined
    setDragging(null)
    if (!booking) return

    // Vertical movement → snapped minute delta → new clamped start time.
    const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
    const deltaMin = snapDeltaToMinutes(e.delta.y)
    const newStart = clampStartMinutes(timeToMinutes(booking.startTime) + deltaMin, duration)

    // Dropping onto a different column (staff in day view, day in week view) moves it there.
    const targetColumn = (e.over?.data.current?.columnId as string | undefined) ?? null
    const sourceColumn = (e.active.data.current?.columnId as string | undefined) ?? null
    const movedColumn = targetColumn && targetColumn !== sourceColumn

    if (deltaMin === 0 && !movedColumn) return // no real change

    reschedule.mutate(
      {
        id: booking.id,
        startTime: minutesToTime(newStart),
        endTime: minutesToTime(newStart + duration),
        // staffId only meaningful in day view; week-view columns are dates.
        ...(view === 'day' && movedColumn ? { staffId: targetColumn! } : {}),
      },
      {
        onSuccess: () =>
          setToast(`${booking.customerName} → ${formatTime12(minutesToTime(newStart))}`),
      },
    )
  }

  if (isError) return <ErrorState />

  const cols = view === 'day' ? staff?.length ?? 4 : 7
  const label = view === 'day'
    ? anchor.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
    : `${format(weekDays[0], 'd MMM')} – ${format(weekDays[6], 'd MMM')}`

  return (
    <Box>
      <PageHeader
        title={t('title')}
        action={<Button variant="contained" startIcon={<AddRounded />} onClick={() => setFormOpen(true)}>{t('addAppointment')}</Button>}
      />

      <Toolbar>
        <ToggleButtonGroup
          exclusive size="small" value={view} onChange={(_, v) => v && setView(v)}
          sx={{ bgcolor: 'background.default', borderRadius: 2, p: '3px', '& .MuiToggleButton-root': { border: 'none', borderRadius: '6px !important', textTransform: 'none', fontWeight: 600, px: 1.75, py: 0.5 }, '& .Mui-selected': { bgcolor: '#fff !important', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' } }}
        >
          <ToggleButton value="day">{t('day')}</ToggleButton>
          <ToggleButton value="week">{t('week')}</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ flex: 1 }} />
        <IconButton size="small" onClick={() => step(-1)}><ChevronLeftRounded /></IconButton>
        <Button size="small" variant="outlined" onClick={() => setAnchor(new Date())}>Today</Button>
        <IconButton size="small" onClick={() => step(1)}><ChevronRightRounded /></IconButton>
        <ToolbarLabel>{label}</ToolbarLabel>
      </Toolbar>

      {isLoading ? (
        <Skeleton variant="rounded" height={520} />
      ) : (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <CalWrap>
            <HeaderRow $cols={cols}>
              <div />
              {view === 'day'
                ? staff?.map((m) => (
                    <div key={m.id}>
                      <UserAvatar name={m.name} color={m.avatarColor} size="sm" />
                      <span>{m.name.split(' ')[0]}</span>
                    </div>
                  ))
                : weekDays.map((d) => (
                    <div key={d.toISOString()} style={{ fontWeight: dayKey(d) === dayKey(now) ? 700 : 600 }}>
                      <span>{format(d, 'EEE d')}</span>
                    </div>
                  ))}
            </HeaderRow>

            <Body $cols={cols}>
              <TimeCol>
                {HOURS.map((h) => <TimeSlot key={h}>{formatTime12(`${h}:00`)}</TimeSlot>)}
              </TimeCol>

              {view === 'day'
                ? staff?.map((m) => (
                    <DroppableColumn key={m.id} columnId={m.id}>
                      {HOURS.map((h) => <RowBg key={h} />)}
                      {dayBookings(dayKey(anchor), m.id).map((b) => (
                        <AppointmentBlock key={b.id} booking={b} compact={false} columnId={m.id} onClick={() => setSelected(b)} />
                      ))}
                      {nowInRange && dayKey(anchor) === dayKey(now) && <CurrentLine $top={nowTop} />}
                    </DroppableColumn>
                  ))
                : weekDays.map((d) => (
                    <DroppableColumn key={d.toISOString()} columnId={dayKey(d)}>
                      {HOURS.map((h) => <RowBg key={h} />)}
                      {dayBookings(dayKey(d)).map((b) => (
                        <AppointmentBlock key={b.id} booking={b} compact columnId={dayKey(d)} onClick={() => setSelected(b)} />
                      ))}
                      {nowInRange && dayKey(d) === dayKey(now) && <CurrentLine $top={nowTop} />}
                    </DroppableColumn>
                  ))}
            </Body>
          </CalWrap>

          <DragOverlay dropAnimation={null}>
            {dragging ? (
              <ApptGhost
                $bg={blockColors(dragging.status).bg}
                $color={blockColors(dragging.status).fg}
                $height={Math.max((timeToMinutes(dragging.endTime) - timeToMinutes(dragging.startTime)) * PX_PER_MIN - 4, 26)}
              >
                <div className="appt-name">{dragging.customerName}</div>
                <div className="appt-svc">{dragging.serviceName}</div>
              </ApptGhost>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      <BookingFormDrawer open={formOpen} onClose={() => setFormOpen(false)} />
      <AppointmentDetailDrawer booking={selected} onClose={() => setSelected(null)} />

      <Snackbar open={!!toast} autoHideDuration={2600} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }} onClose={() => setToast(null)}>
          Rescheduled · {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}
