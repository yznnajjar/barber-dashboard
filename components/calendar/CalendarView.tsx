'use client'
import { Box, Button, ToggleButtonGroup, ToggleButton, IconButton, Skeleton, Snackbar, Alert } from '@mui/material'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import AddRounded from '@mui/icons-material/AddRounded'
import { format } from 'date-fns'
import { formatTime12, dayKey, timeToMinutes } from '@/lib/utils'
import { blockColors, PX_PER_MIN, CALENDAR_VIEWS } from './calendarConfig'
import { useCalendarView } from './useCalendarView'
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

export default function CalendarView() {
  const {
    t, view, setView, anchor, setAnchor, selected, setSelected,
    formOpen, setFormOpen, dragging, toast, setToast,
    isLoading, isError, staff, sensors, weekDays,
    now, nowTop, nowInRange, cols, label, HOURS,
    step, dayBookings, onDragStart, onDragEnd,
  } = useCalendarView()

  if (isError) return <ErrorState />

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
          <ToggleButton value={CALENDAR_VIEWS.DAY}>{t('day')}</ToggleButton>
          <ToggleButton value={CALENDAR_VIEWS.WEEK}>{t('week')}</ToggleButton>
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
              {view === CALENDAR_VIEWS.DAY
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

              {view === CALENDAR_VIEWS.DAY
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
