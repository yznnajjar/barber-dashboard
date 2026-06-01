import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSensor, useSensors, PointerSensor, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { addDays, startOfWeek, format } from 'date-fns'
import { useBookings } from '@/hooks/queries/useBookings'
import { useStaff } from '@/hooks/queries/useStaff'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { formatTime12, timeToMinutes, minutesToTime } from '@/lib/utils'
import { START_HOUR, END_HOUR, PX_PER_MIN, HOURS, snapDeltaToMinutes, clampStartMinutes, CALENDAR_VIEWS, type CalendarView } from './calendarConfig'
import type { Booking } from '@/types'

function getNowMarker() {
  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  return {
    now,
    nowTop: (nowMin - START_HOUR * 60) * PX_PER_MIN,
    nowInRange: nowMin >= START_HOUR * 60 && nowMin <= END_HOUR * 60,
  }
}

function getViewLabel(view: CalendarView, anchor: Date, weekDays: Date[]) {
  if (view === CALENDAR_VIEWS.DAY) return anchor.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  return `${format(weekDays[0], 'd MMM')} – ${format(weekDays[6], 'd MMM')}`
}

function getCols(view: CalendarView, staffLength?: number) {
  return view === CALENDAR_VIEWS.DAY ? staffLength ?? 4 : 7
}

export function useCalendarView() {
  const t = useTranslations('calendar')

  const [view, setView] = useState<CalendarView>(CALENDAR_VIEWS.DAY)
  const [anchor, setAnchor] = useState<Date>(new Date())
  const [selected, setSelected] = useState<Booking | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [dragging, setDragging] = useState<Booking | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const dateKey = format(anchor, 'yyyy-MM-dd')
  const { data: bookings, isLoading, isError } = useBookings(dateKey, view)
  const { data: staff } = useStaff()
  const reschedule = useRescheduleBooking()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor, { weekStartsOn: 0 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [anchor])

  const { now, nowTop, nowInRange } = getNowMarker()
  const cols = getCols(view, staff?.length)
  const label = getViewLabel(view, anchor, weekDays)

  const step = (dir: number) => setAnchor((d) => addDays(d, dir * (view === CALENDAR_VIEWS.WEEK ? 7 : 1)))

  const dayBookings = (key: string, staffId?: string) =>
    (bookings ?? []).filter((b) => b.date === key && (staffId ? b.staffId === staffId : true))

  const onDragStart = (e: DragStartEvent) => {
    console.log('drag start', e.active.data.current?.booking)
    setDragging((e.active.data.current?.booking as Booking) ?? null)
  }


  const onDragEnd = (e: DragEndEvent) => {
    console.log('drag end', e.active.data.current?.booking, e.over?.data.current)
    const booking = e.active.data.current?.booking as Booking | undefined

    console.log({booking})
    setDragging(null)
    if (!booking) return

    const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
    const deltaMin = snapDeltaToMinutes(e.delta.y)
    const newStart = clampStartMinutes(timeToMinutes(booking.startTime) + deltaMin, duration)

    const targetColumn = (e.over?.data.current?.columnId as string | undefined) ?? null
    const sourceColumn = (e.active.data.current?.columnId as string | undefined) ?? null
    const movedColumn = targetColumn && targetColumn !== sourceColumn

    if (deltaMin === 0 && !movedColumn) return

    // In week view, columnId is a date string; in day view it's a staff ID — only substitute when it's a date
    const newDate = (view === CALENDAR_VIEWS.WEEK && targetColumn) ? targetColumn : booking.date
    const newStartAt = `${newDate}T${minutesToTime(newStart)}:00.000Z`
    reschedule.mutate(
      { id: booking.id, startAt: newStartAt },
      { onSuccess: () => setToast(`${booking.customerName} → ${formatTime12(minutesToTime(newStart))}`) },
    )
  }

  return {
    t,
    view, setView,
    anchor, setAnchor,
    selected, setSelected,
    formOpen, setFormOpen,
    dragging,
    toast, setToast,
    bookings,
    isLoading, isError,
    staff,
    sensors,
    weekDays,
    now, nowTop, nowInRange,
    cols, label,
    HOURS,
    step,
    dayBookings,
    onDragStart,
    onDragEnd,
  }
}
