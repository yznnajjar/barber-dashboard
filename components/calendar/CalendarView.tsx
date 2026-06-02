'use client'
import { useCallback, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Box, Button, Popover, Skeleton, Snackbar, Alert, LinearProgress, Chip } from '@mui/material'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import AddRounded from '@mui/icons-material/AddRounded'
import LockClockRounded from '@mui/icons-material/LockClockRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import PeopleAltRounded from '@mui/icons-material/PeopleAltRounded'
import FlagRounded from '@mui/icons-material/FlagRounded'
import GridViewRounded from '@mui/icons-material/GridViewRounded'
import PaletteRounded from '@mui/icons-material/PaletteRounded'
import FilterListRounded from '@mui/icons-material/FilterListRounded'
import { addDays, startOfWeek, format } from 'date-fns'
import { useBookings } from '@/hooks/queries/useBookings'
import { useStaff } from '@/hooks/queries/useStaff'
import { useServices } from '@/hooks/queries/useServices'
import { useCalendarState } from '@/hooks/calendar/useCalendarState'
import { useCalendarFilters } from '@/hooks/calendar/useCalendarFilters'
import { useCalendarDnD } from '@/hooks/calendar/useCalendarDnD'
import { dayKey } from '@/lib/utils'
import { colorForBooking, nowPosition, weekdayOf, calendarCols, calendarLabel, shiftPosition, blockHeightPx, WEEK_START_DAY } from './calendarConfig'
import { HOURS } from './calendarConfig'
import { STATUS_COLORS, CALENDAR_PALETTE } from '@/lib/colors'
import PageHeader from '@/components/shared/PageHeader'
import UserAvatar from '@/components/shared/UserAvatar'
import ErrorState from '@/components/shared/ErrorState'
import BookingFormModal from './BookingFormModal'
import AppointmentBlock from './AppointmentBlock'
import AppointmentDetailPopover from './AppointmentDetailPopover'
import BlockedTimeBlock from './BlockedTimeBlock'
import BlockedTimeModal from './BlockedTimeModal'
import MonthView from './MonthView'
import DroppableColumn from './DroppableColumn'
import CalendarFilterChip from './CalendarFilterChip'
import MiniCalendar from './MiniCalendar'
import {
  CalWrap, HeaderRow, Body, TimeCol, TimeSlot, RowBg, CurrentLine,
  Toolbar, FilterStrip, ApptGhost, ShiftIndicator, OffOverlay,
  Seg, SegBtn, NavCluster, NavIconBtn, TodayBtn, DateLabelBtn, StatusDot,
  Caret, StaffName, StaffRole, WeekDayHeader, WeekDayName, WeekDayNum,
  addApptBtnSx, popoverPaperSx, blockedTimeBtnSx,
} from './CalendarView.styled'
import {
  CALENDAR_VIEW_DAY, CALENDAR_VIEW_WEEK, CALENDAR_VIEW_MONTH,
} from '@/constants'
import type { Booking, BlockedTime, BookingStatus } from '@/types'
import type { ColorMode } from './calendarConfig'

const STATUS_ORDER: BookingStatus[] = [
  'PENDING', 'CONFIRMED', 'ARRIVED', 'STARTED', 'COMPLETED', 'NO_SHOW', 'CANCELLED',
]

let blockIdCounter = 0
const nextBlockId = () => `blocked-${Date.now()}-${++blockIdCounter}`

export default function CalendarView() {
  const t = useTranslations('calendar')

  const { view, setView, anchor, setAnchor, step, colorMode, setColorMode, dateAnchor, setDateAnchor } = useCalendarState()
  const { filters, setFilters, hasActiveFilters } = useCalendarFilters()
  const { dragging, toast, setToast, sensors, onDragStart, onDragEnd } = useCalendarDnD({ view })

  const [detail, setDetail] = useState<{ booking: Booking; anchorEl: HTMLElement } | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  // Blocked time — local state until backend endpoints exist.
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([])
  const [blockedDrawerOpen, setBlockedDrawerOpen] = useState(false)
  const [editingBlock, setEditingBlock] = useState<BlockedTime | null>(null)

  const dateKey = dayKey(anchor)
  const { data: bookings, isLoading, isFetching, isError } = useBookings(dateKey, view, filters)
  const { data: staff } = useStaff()
  const { data: services } = useServices()

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor, { weekStartsOn: WEEK_START_DAY })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [anchor])

  const now = new Date()
  const { nowMin, nowTop, nowInRange } = nowPosition(now)
  const currentWeekday = weekdayOf(anchor)

  const getShift = (staffId: string) => {
    const member = staff?.find((m) => m.id === staffId)
    if (!member) return null
    const wd = member.workingHours?.find((wh) => wh.day === currentWeekday)
    return wd?.enabled ? wd : null
  }

  const dayBookings = useMemo(() => {
    const all = bookings ?? []
    return (key: string, staffId?: string) =>
      all.filter((b) => b.date === key && (staffId ? b.staffId === staffId : true))
  }, [bookings])

  const dayBlockedTimes = useMemo(() => {
    return (key: string, staffId: string) =>
      blockedTimes.filter((bt) => bt.date === key && bt.staffId === staffId)
  }, [blockedTimes])

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

  // Distinct colour per staff member, assigned by list order so no two collide.
  const staffColors = useMemo(() => {
    const map: Record<string, { bg: string; fg: string }> = {}
    ;(staff ?? []).forEach((m, i) => {
      const c = CALENDAR_PALETTE[i % CALENDAR_PALETTE.length]
      map[m.id] = { bg: c.bg, fg: c.fg }
    })
    return map
  }, [staff])

  const busyDays = useMemo(() => new Set((bookings ?? []).map((b) => b.date)), [bookings])

  // Service lookups for block footer / detail popover.
  const priceByService = useMemo(() => {
    const map: Record<string, number> = {}
    ;(services ?? []).forEach((s) => { map[s.id] = s.price })
    return map
  }, [services])

  const staffNameById = useMemo(() => {
    const map: Record<string, string> = {}
    ;(staff ?? []).forEach((m) => { map[m.id] = m.name })
    return map
  }, [staff])

  // Bookings per staff across the visible range (day/week/month) shown in the Team filter.
  const bookingsByStaff = useMemo(() =>
    (bookings ?? []).reduce<Record<string, number>>((acc, b) => {
      acc[b.staffId] = (acc[b.staffId] ?? 0) + 1
      return acc
    }, {}),
  [bookings])

  if (isError) return <ErrorState />

  const cols = calendarCols(view, staff?.length)
  const label = calendarLabel(view, anchor)

  const draggingColor = dragging
    ? (colorMode === 'staff' && staffColors[dragging.staffId]) || colorForBooking(dragging, colorMode)
    : null

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

        {/* Filter active badge — shown in month view when filters are set */}
        {view === CALENDAR_VIEW_MONTH && hasActiveFilters && (
          <Chip
            icon={<FilterListRounded />}
            label="Filters active"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          />
        )}

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

      {/* Thin refetch indicator — shown while filter-triggered refetch is in flight */}
      {isFetching && !isLoading && (
        <LinearProgress sx={{ height: 2, borderRadius: 0 }} />
      )}

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
            onChange={(v) => setFilters({ ...filters, staffIds: v })}
            options={
              (staff ?? []).map((m) => ({
                value: m.id,
                primary: m.name,
                secondary: m.role,
                searchText: `${m.name} ${m.role ?? ''}`,
                left: <UserAvatar name={m.name} color={m.avatarColor} size="sm" />,
                right: String(bookingsByStaff[m.id] ?? 0),
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
            onChange={(v) => setFilters({ ...filters, statuses: v })}
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
            onChange={(v) => setFilters({ ...filters, serviceIds: v })}
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
                ? staff?.map((m) => (
                    <div key={m.id}>
                      <UserAvatar name={m.name} color={m.avatarColor} size="lg" />
                      <StaffName>{m.name.split(' ')[0]}</StaffName>
                      <StaffRole>{m.role}</StaffRole>
                    </div>
                  ))
                : weekDays.map((d) => {
                    const isToday = dayKey(d) === dayKey(now)
                    return (
                      <WeekDayHeader key={d.toISOString()} $isToday={isToday}>
                        <WeekDayName $isToday={isToday}>{format(d, 'EEE')}</WeekDayName>
                        <WeekDayNum $isToday={isToday}>{format(d, 'd')}</WeekDayNum>
                      </WeekDayHeader>
                    )
                  })}
            </HeaderRow>

            <Body $cols={cols}>
              <TimeCol>
                {HOURS.map((h) => (
                  <TimeSlot key={h}>
                    <span>{h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`}</span>
                  </TimeSlot>
                ))}
              </TimeCol>

              {view === CALENDAR_VIEW_DAY
                ? staff?.map((m) => {
                    const shift = getShift(m.id)
                    const { top: shiftTop, height: shiftH } = shiftPosition(shift)
                    return (
                      <DroppableColumn key={m.id} columnId={m.id}>
                        {HOURS.map((h) => <RowBg key={h} />)}
                        {shift ? (
                          <ShiftIndicator $top={shiftTop} $height={shiftH} />
                        ) : (
                          <OffOverlay>Off</OffOverlay>
                        )}
                        {dayBookings(dayKey(anchor), m.id).map((b) => (
                          <AppointmentBlock key={b.id} booking={b} compact={false} columnId={m.id} colorMode={colorMode} staffColor={staffColors[b.staffId]} price={priceByService[b.serviceId]} onClick={(anchorEl) => setDetail({ booking: b, anchorEl })} />
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
                        <AppointmentBlock key={b.id} booking={b} compact columnId={dayKey(d)} colorMode={colorMode} staffColor={staffColors[b.staffId]} price={priceByService[b.serviceId]} onClick={(anchorEl) => setDetail({ booking: b, anchorEl })} />
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
                $height={blockHeightPx(dragging.startTime, dragging.endTime)}
              >
                <div className="appt-tm">{dragging.startTime}–{dragging.endTime}</div>
                <div className="appt-name">{dragging.customerName}</div>
                <div className="appt-svc">{dragging.serviceName}</div>
              </ApptGhost>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      <BookingFormModal open={formOpen} onClose={() => setFormOpen(false)} />
      <AppointmentDetailPopover
        booking={detail?.booking ?? null}
        anchorEl={detail?.anchorEl ?? null}
        price={detail ? priceByService[detail.booking.serviceId] : undefined}
        staffName={detail ? staffNameById[detail.booking.staffId] : undefined}
        onClose={() => setDetail(null)}
      />
      <BlockedTimeModal
        open={blockedDrawerOpen}
        editing={editingBlock}
        onSave={saveBlockedTime}
        onDelete={deleteBlockedTime}
        onClose={() => { setBlockedDrawerOpen(false); setEditingBlock(null) }}
      />

      <Snackbar
        open={!!toast}
        autoHideDuration={2600}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast?.severity ?? 'success'}
          variant="filled"
          sx={{ borderRadius: 2 }}
          onClose={() => setToast(null)}
        >
          {toast?.severity === 'success' ? `Rescheduled · ${toast.message}` : toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
