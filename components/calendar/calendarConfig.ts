import { STATUS_COLORS } from '@/lib/colors'
import type { BookingStatus } from '@/types'

export const CALENDAR_VIEWS = {
  DAY: 'day',
  WEEK: 'week',
} as const

export type CalendarView = typeof CALENDAR_VIEWS[keyof typeof CALENDAR_VIEWS]

export const START_HOUR = 9
export const END_HOUR = 20
export const PX_PER_MIN = 1 // 60px per hour row
export const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)

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
