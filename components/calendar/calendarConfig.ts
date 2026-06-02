import { format, addDays, startOfWeek } from 'date-fns'
import { timeToMinutes } from '@/lib/utils'
import { STATUS_COLORS, CALENDAR_PALETTE } from '@/lib/colors'
import type { CalendarViewType } from '@/constants'
import type { BookingStatus } from '@/types'

export const START_HOUR = 8
export const END_HOUR = 20
export const ROW_PX = 64 // hour-row height (Fresha grid)
export const PX_PER_MIN = ROW_PX / 60 // derive per-minute scale from the row height
export const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)

export const WEEK_START_DAY = 0 as const  // 0 = Sunday

export const BLOCK_MIN_HEIGHT_PX = 26
export const BLOCK_PX_PADDING    = 4
export const STRIP_DAYS          = 14

/** Pixel top-offset for a block from the grid's start hour. */
export const blockTopPx = (startTime: string): number =>
  (timeToMinutes(startTime) - START_HOUR * 60) * PX_PER_MIN

/** Pixel height for an appointment or blocked-time block. */
export const blockHeightPx = (startTime: string, endTime: string): number =>
  Math.max(
    (timeToMinutes(endTime) - timeToMinutes(startTime)) * PX_PER_MIN - BLOCK_PX_PADDING,
    BLOCK_MIN_HEIGHT_PX,
  )

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
export type WeekdayLabel = typeof WEEKDAY_LABELS[number]

/** Returns the short weekday label ('Mon', 'Tue', …) for a given date. */
export const weekdayOf = (date: Date): WeekdayLabel => WEEKDAY_LABELS[date.getDay()]

/** Current time position on the calendar grid, derived from START_HOUR / END_HOUR / PX_PER_MIN. */
export const nowPosition = (now = new Date()) => {
  const nowMin = now.getHours() * 60 + now.getMinutes()
  return {
    nowMin,
    nowTop: (nowMin - START_HOUR * 60) * PX_PER_MIN,
    nowInRange: nowMin >= START_HOUR * 60 && nowMin <= END_HOUR * 60,
  }
}

/** Number of columns for the calendar grid. Day view = one column per staff member, week = 7. */
export const calendarCols = (view: CalendarViewType, staffCount = 4): number =>
  view === 'day' ? staffCount : 7

/** Human-readable date label for the toolbar (e.g. "Mon 2 Jun", "2–8 Jun", "June 2026"). */
export const calendarLabel = (view: CalendarViewType, anchor: Date): string => {
  if (view === 'day') {
    return anchor.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
  }
  if (view === 'week') {
    const start = startOfWeek(anchor, { weekStartsOn: WEEK_START_DAY })
    return `${format(start, 'd MMM')} – ${format(addDays(start, 6), 'd MMM')}`
  }
  return format(anchor, 'MMMM yyyy')
}

/** Pixel top-offset and height for a staff shift band on the grid. */
export const shiftPosition = (shift: { start: string; end: string } | null) => ({
  top: shift ? (timeToMinutes(shift.start) - START_HOUR * 60) * PX_PER_MIN : 0,
  height: shift ? (timeToMinutes(shift.end) - timeToMinutes(shift.start)) * PX_PER_MIN : 0,
})

// Drag-to-reschedule snaps to this grid (minutes).
export const SNAP_MINUTES = 15

/** Convert a vertical drag delta (px) into a snapped minute offset. */
export const snapDeltaToMinutes = (deltaY: number): number =>
  Math.round(deltaY / PX_PER_MIN / SNAP_MINUTES) * SNAP_MINUTES

/** Clamp a start-minute so the whole block stays inside the grid. */
export const clampStartMinutes = (startMin: number, durationMin: number): number => {
  const min = START_HOUR * 60
  const max = END_HOUR * 60 - durationMin
  return Math.max(min, Math.min(max, startMin))
}

// Calendar blocks reuse the single status-colour source.
export const blockColors = (status: BookingStatus) => ({
  bg: STATUS_COLORS[status].bg,
  fg: STATUS_COLORS[status].fg,
})

const hashColor = (key: string) => {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0
  return CALENDAR_PALETTE[Math.abs(h) % CALENDAR_PALETTE.length]
}

export type ColorMode = 'status' | 'service' | 'staff'

export const colorForBooking = (
  booking: { status: BookingStatus; serviceName: string; staffId: string },
  mode: ColorMode,
) => {
  if (mode === 'service') return hashColor(booking.serviceName)
  if (mode === 'staff') return hashColor(booking.staffId)
  return blockColors(booking.status)
}
