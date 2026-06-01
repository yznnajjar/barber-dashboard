'use client'
import { useCallback, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Button, Popover, Skeleton, Snackbar, Alert } from '@mui/material'
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  type DragStartEvent, type DragEndEvent,
} from '@dnd-kit/core'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import AddRounded from '@mui/icons-material/AddRounded'
import LockClockRounded from '@mui/icons-material/LockClockRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded'
import FlagRounded from '@mui/icons-material/FlagRounded'
import GridViewRounded from '@mui/icons-material/GridViewRounded'
import PaletteRounded from '@mui/icons-material/PaletteRounded'
import { addDays, startOfWeek, format } from 'date-fns'
import { useBookings } from '@/hooks/queries/useBookings'
import { useStaff } from '@/hooks/queries/useStaff'
import { useServices } from '@/hooks/queries/useServices'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { formatTime12, dayKey, timeToMinutes, minutesToTime } from '@/lib/utils'
import { colorForBooking, type ColorMode } from './calendarConfig'
import {
  START_HOUR, END_HOUR, PX_PER_MIN, HOURS, snapDeltaToMinutes, clampStartMinutes,
} from './calendarConfig'
import { STATUS_COLORS } from '@/lib/colors'
import PageHeader from '@/components/shared/PageHeader'
import UserAvatar from '@/components/shared/UserAvatar'
import ErrorState from '@/components/shared/ErrorState'
import BookingFormDrawer from './BookingFormDrawer'
import AppointmentBlock from './AppointmentBlock'
import AppointmentDetailDrawer from './AppointmentDetailDrawer'
import BlockedTimeBlock from './BlockedTimeBlock'
import BlockedTimeDrawer from './BlockedTimeDrawer'
import MonthView from './MonthView'
import DroppableColumn from './DroppableColumn'
import CalendarFilterChip from './CalendarFilterChip'
import MiniCalendar from './MiniCalendar'
import {
  CalWrap, HeaderRow, Body, TimeCol, TimeSlot, RowBg, CurrentLine,
  Toolbar, FilterStrip, ApptGhost, ShiftIndicator, OffOverlay,
  Seg, SegBtn, NavCluster, NavIconBtn, TodayBtn, DateLabelBtn, StatusDot,
  Caret, ShiftTimeLabel, WeekDayHeader,
  addApptBtnSx, popoverPaperSx, blockedTimeBtnSx,
} from './CalendarView.styled'
import {
  CALENDAR_VIEW_DAY, CALENDAR_VIEW_WEEK, CALENDAR_VIEW_MONTH, type CalendarViewType,
} from '@/constants'
import type { Booking, BlockedTime, BookingStatus } from '@/types'

const STATUS_ORDER: BookingStatus[] = [
  'PENDING', 'CONFIRMED', 'ARRIVED', 'STARTED', 'COMPLETED', 'NO_SHOW', 'CANCELLED',
]

let blockIdCounter = 0
const nextBlockId = () => `blocked-${Date.now()}-${++blockIdCounter}`

export default function CalendarView() {
  const t = useTranslations('calendar')
  const [view, setView] = useState<CalendarViewType>(CALENDAR_VIEW_DAY)
  const [anchor, setAnchor] = useState<Date>(new Date())
  const [selected, setSelected] = useState<Booking | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [dragging, setDragging] = useState<Booking | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  // Blocked time — local state until backend endpoints exist.
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
  const [blockedDrawerOpen, setBlockedDrawerOpen] = useState(false)
  const [editingBlock, setEditingBlock] = useState<BlockedTime | null>(null)

  const [filters, setFilters] = useState({ staffIds: [] as string[], statuses: [] as string[], serviceIds: [] as string[] })
  const [colorMode, setColorMode] = useState<ColorMode>('status')

  // Date jump popover anchor.
  const [dateAnchor, setDateAnchor] = useState<HTMLButtonElement | null>(null)

  const dateKey = format(anchor, 'yyyy-MM-dd')
  const { data: bookings, isLoading, isError } = useBookings(dateKey, view, filters)
  const { data: staff } = useStaff()
  const { data: services } = useServices()
  const reschedule = useRescheduleBooking()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor, { weekStartsOn: 0 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [anchor])

  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const nowTop = (nowMin - START_HOUR * 60) * PX_PER_MIN
  const nowInRange = nowMin >= START_HOUR * 60 && nowMin <= END_HOUR * 60

  const step = (dir: number) => setAnchor((d) => addDays(d, dir * (view === CALENDAR_VIEW_WEEK ? 7 : 1)))
  // Map JS day-of-week to the enum label used in WorkingDay.
  const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentWeekday = WEEKDAY_LABELS[anchor.getDay()]

  const getShift = (staffId: string) => {
    const member = staff?.find((m) => m.id === staffId)
    if (!member) return null
    const wd = member.workingHours?.find((wh) => wh.day === currentWeekday)
    return wd?.enabled ? wd : null
  }

  const dayBookings = (key: string, staffId?: string) =>
    (bookings ?? []).filter((b) => b.date === key && (staffId ? b.staffId === staffId : true))

  const dayBlockedTimes = (key: string, staffId: string) =>
    blockedTimes.filter((bt) => bt.date === key && bt.staffId === staffId)

  const saveBlockedTime = useCallback((data: Omit<BlockedTime, 'id'>) => {
    setBlockedTimes((prev) => [...prev, { ...data, id: nextBlockId() }])
  }, [])

  const deleteBlockedTime = useCallback((id: string) => {
    setBlockedTimes((prev) => prev.filter((bt) => bt.id !== id))
  }, [])

  const openBlockedDrawer = (block?: BlockedTime) => {
    setEditingBlock(block ?? null)
    setBlockedDrawerOpen(true)
  }

  const onDragStart = (e: DragStartEvent) => {
    setDragging((e.active.data.current?.booking as Booking) ?? null)
  }

  const onDragEnd = (e: DragEndEvent) => {
    const booking = e.active.data.current?.booking as Booking | undefined
    setDragging(null)
    if (!booking) return

    const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
    const deltaMin = snapDeltaToMinutes(e.delta.y)
    const newStart = clampStartMinutes(timeToMinutes(booking.startTime) + deltaMin, duration)

    const targetColumn = (e.over?.data.current?.columnId as string | undefined) ?? null
    const sourceColumn = (e.active.data.current?.columnId as string | undefined) ?? null
    const movedColumn = targetColumn && targetColumn !== sourceColumn

    if (deltaMin === 0 && !movedColumn) return

    const newDate = (view === CALENDAR_VIEW_WEEK && movedColumn) ? targetColumn! : booking.date
    const newStartAt = `${newDate}T${minutesToTime(newStart)}:00.000Z`
    reschedule.mutate(
      { id: booking.id, startAt: newStartAt },
      {
        onSuccess: () =>
          setToast(`${booking.customerName} → ${formatTime12(minutesToTime(newStart))}`),
      },
    )
  }

  if (isError) return <ErrorState />

  const cols = view === CALENDAR_VIEW_DAY ? staff?.length ?? 4 : 7
  const label = view === CALENDAR_VIEW_DAY
    ? anchor.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    : view === CALENDAR_VIEW_WEEK
    ? `${format(weekDays[0], 'd MMM')} – ${format(weekDays[6], 'd MMM')}`
    : format(anchor, 'MMMM yyyy')

  // Days that have at least one booking — drives the gold dot under the
  // mini-calendar numbers.
  const busyDays = useMemo(() => new Set((bookings ?? []).map((b) => b.date)), [bookings])

  // Booking counts per staff (today) — surfaced as the right-side number on
  // each Team filter row, mirroring Fresha's "8" / "6" indicators.
  const todayKey = dayKey(anchor)
  const bookingsByStaff = useMemo(() =>
    (bookings ?? []).reduce<Record<string, number>>((acc, b) => {
      if (b.date === todayKey) acc[b.staffId] = (acc[b.staffId] ?? 0) + 1
      return acc
    }, {}),
  [bookings, todayKey])

  const draggingColor = dragging ? colorForBooking(dragging, colorMode) : null

  return (
    <Box>
      <PageHeader
        title={t('title')}
        action={
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={() => setFormOpen(true)}
            sx={addApptBtnSx}
          >
            {t('addAppointment')}
          </Button>
        }
      />

      {/* Strip 1 — view switch + date nav */}
      <Toolbar>
        <Seg role="tablist" aria-label="View">
          <SegBtn $on={view === CALENDAR_VIEW_DAY} onClick={() => setView(CALENDAR_VIEW_DAY)}>{t('day')}</SegBtn>
          <SegBtn $on={view === CALENDAR_VIEW_WEEK} onClick={() => setView(CALENDAR_VIEW_WEEK)}>{t('week')}</SegBtn>
          <SegBtn $on={view === CALENDAR_VIEW_MONTH} onClick={() => setView(CALENDAR_VIEW_MONTH)}>{t('month')}</SegBtn>
        </Seg>

        <Box sx={{ flex: 1 }} />

        <NavCluster>
          <NavIconBtn type="button" onClick={() => step(-1)} aria-label="Previous">
            <ChevronLeftRounded />
          </NavIconBtn>
          <TodayBtn type="button" onClick={() => setAnchor(new Date())}>{t('today')}</TodayBtn>
          <NavIconBtn type="button" onClick={() => step(1)} aria-label="Next">
            <ChevronRightRounded />
          </NavIconBtn>
          <DateLabelBtn type="button" onClick={(e) => setDateAnchor(e.currentTarget)}>
            <CalendarMonthRounded />
            {label}
            <Caret />
          </DateLabelBtn>
        </NavCluster>
      </Toolbar>

      <Popover
        open={Boolean(dateAnchor)}
        anchorEl={dateAnchor}
        onClose={() => setDateAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: popoverPaperSx } }}
      >
        <MiniCalendar
          value={anchor}
          busyDays={busyDays}
          onPick={(d) => { setAnchor(d); setDateAnchor(null) }}
        />
      </Popover>

      {/* Strip 2 — filters (day/week only) */}
      {view !== CALENDAR_VIEW_MONTH && (
        <FilterStrip>
          <CalendarFilterChip
            icon={<PeopleAltRounded />}
            emptyLabel="All team"
            activeLabel="Team"
            title="Team members"
            searchPlaceholder="Search team…"
            value={filters.staffIds}
            onChange={(v) => setFilters((f) => ({ ...f, staffIds: v }))}
            options={
              (staff ?? []).map((m) => ({
                value: m.id,
                primary: m.name,
                secondary: m.role,
                searchText: `${m.name} ${m.role ?? ''}`,
                left: <UserAvatar name={m.name} color={m.avatarColor} size="sm" />,
                right: bookingsByStaff[m.id] ? String(bookingsByStaff[m.id]) : undefined,
              }))
            }
          />

          <CalendarFilterChip
            icon={<FlagRounded />}
            emptyLabel="All statuses"
            activeLabel="Status"
            title="Appointment status"
            width={248}
            value={filters.statuses}
            onChange={(v) => setFilters((f) => ({ ...f, statuses: v }))}
            options={STATUS_ORDER.map((s) => {
              const c = STATUS_COLORS[s]
              return {
                value: s,
                searchText: c.label,
                primary: <StatusDot $bg={c.bg} $fg={c.fg}>{c.label}</StatusDot>,
              }
            })}
          />

          <CalendarFilterChip
            icon={<GridViewRounded />}
            emptyLabel="All services"
            activeLabel="Services"
            title="Services"
            searchPlaceholder="Search services…"
            value={filters.serviceIds}
            onChange={(v) => setFilters((f) => ({ ...f, serviceIds: v }))}
            options={(services ?? []).map((s) => ({
              value: s.id,
              primary: s.name,
              searchText: s.name,
            }))}
          />

          <CalendarFilterChip
            icon={<PaletteRounded />}
            emptyLabel="By status"
            activeLabel={
              colorMode === 'status' ? 'By status' : colorMode === 'service' ? 'By service' : 'By staff'
            }
            title="Colour blocks by"
            compact
            value={[colorMode]}
            onChange={(next) => {
              const v = next[next.length - 1] as ColorMode | undefined
              if (v) setColorMode(v)
            }}
            options={[
              { value: 'status', primary: 'By status' },
              { value: 'service', primary: 'By service' },
              { value: 'staff', primary: 'By staff' },
            ]}
          />

          <Box sx={{ flex: 1 }} />

          <Button
            startIcon={<LockClockRounded />}
            onClick={() => openBlockedDrawer()}
            sx={blockedTimeBtnSx}
          >
            Add blocked time
          </Button>
        </FilterStrip>
      )}

      {view === CALENDAR_VIEW_MONTH ? (
        isLoading ? (
          <Skeleton variant="rounded" height={520} />
        ) : (
          <MonthView
            anchor={anchor}
            bookings={bookings ?? []}
            onDayClick={(date) => { setAnchor(date); setView(CALENDAR_VIEW_DAY) }}
          />
        )
      ) : isLoading ? (
        <Skeleton variant="rounded" height={520} />
      ) : (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <CalWrap>
            <HeaderRow $cols={cols}>
              <div />
              {view === CALENDAR_VIEW_DAY
                ? staff?.map((m) => {
                    const shift = getShift(m.id)
                    return (
                      <div key={m.id}>
                        <UserAvatar name={m.name} color={m.avatarColor} size="sm" />
                        <span>{m.name.split(' ')[0]}</span>
                        {shift && (
                          <ShiftTimeLabel>
                            {formatTime12(shift.start)}–{formatTime12(shift.end)}
                          </ShiftTimeLabel>
                        )}
                      </div>
                    )
                  })
                : weekDays.map((d) => (
                    <WeekDayHeader key={d.toISOString()} $isToday={dayKey(d) === dayKey(now)}>
                      <span>{format(d, 'EEE d')}</span>
                    </WeekDayHeader>
                  ))}
            </HeaderRow>

            <Body $cols={cols}>
              <TimeCol>
                {HOURS.map((h) => <TimeSlot key={h}>{formatTime12(`${h}:00`)}</TimeSlot>)}
              </TimeCol>

              {view === CALENDAR_VIEW_DAY
                ? staff?.map((m) => {
                    const shift = getShift(m.id)
                    const shiftTop = shift ? (timeToMinutes(shift.start) - START_HOUR * 60) * PX_PER_MIN : 0
                    const shiftH = shift ? (timeToMinutes(shift.end) - timeToMinutes(shift.start)) * PX_PER_MIN : 0
                    return (
                      <DroppableColumn key={m.id} columnId={m.id}>
                        {HOURS.map((h) => <RowBg key={h} />)}
                        {shift ? (
                          <ShiftIndicator $top={shiftTop} $height={shiftH} />
                        ) : (
                          <OffOverlay>Off</OffOverlay>
                        )}
                        {dayBookings(dayKey(anchor), m.id).map((b) => (
                          <AppointmentBlock key={b.id} booking={b} compact={false} columnId={m.id} colorMode={colorMode} onClick={() => setSelected(b)} />
                        ))}
                        {dayBlockedTimes(dayKey(anchor), m.id).map((bt) => (
                          <BlockedTimeBlock key={bt.id} block={bt} onClick={() => openBlockedDrawer(bt)} />
                        ))}
                        {nowInRange && dayKey(anchor) === dayKey(now) && <CurrentLine $top={nowTop} />}
                      </DroppableColumn>
                    )
                  })
                : weekDays.map((d) => (
                    <DroppableColumn key={d.toISOString()} columnId={dayKey(d)}>
                      {HOURS.map((h) => <RowBg key={h} />)}
                      {dayBookings(dayKey(d)).map((b) => (
                        <AppointmentBlock key={b.id} booking={b} compact columnId={dayKey(d)} colorMode={colorMode} onClick={() => setSelected(b)} />
                      ))}
                      {nowInRange && dayKey(d) === dayKey(now) && <CurrentLine $top={nowTop} />}
                    </DroppableColumn>
                  ))}
            </Body>
          </CalWrap>

          <DragOverlay dropAnimation={null}>
            {dragging && draggingColor ? (
              <ApptGhost
                $bg={draggingColor.bg}
                $color={draggingColor.fg}
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
      <BlockedTimeDrawer
        open={blockedDrawerOpen}
        editing={editingBlock}
        onSave={saveBlockedTime}
        onDelete={deleteBlockedTime}
        onClose={() => { setBlockedDrawerOpen(false); setEditingBlock(null) }}
      />

      <Snackbar open={!!toast} autoHideDuration={2600} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }} onClose={() => setToast(null)}>
          Rescheduled · {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}
