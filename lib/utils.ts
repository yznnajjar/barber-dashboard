import { format, parseISO } from 'date-fns'

/* ────────────────────────── Money ────────────────────────── */

/** Always format prices with this — never format JD manually. */
export const formatJD = (amount: number): string => `${amount.toFixed(3)} JD`

/** Compact money for stat cards, e.g. 1,240.000 JD */
export const formatJDCompact = (amount: number): string =>
  `${amount.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} JD`

/* ────────────────────────── Dates & times ────────────────────────── */

export const formatDate = (iso: string | null | undefined): string => {
  if (!iso) return '—'
  const d = parseISO(iso)
  return isNaN(d.getTime()) ? '—' : format(d, 'dd/MM/yyyy')
}

/** Date → 'yyyy-MM-dd' key (matches Booking.date). */
export const dayKey = (d: Date): string => format(d, 'yyyy-MM-dd')

export const formatTime12 = (hhmm: string): string => {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

export const formatDuration = (mins: number): string => `${mins} min`

/** 'HH:mm' → minutes since midnight. */
export const timeToMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Minutes since midnight → 'HH:mm'. */
export const minutesToTime = (mins: number): string =>
  `${Math.floor(mins / 60).toString().padStart(2, '0')}:${(mins % 60).toString().padStart(2, '0')}`

/** 'HH:mm' → today's Date at that time (for MUI TimePicker). */
export const timeStringToDate = (hhmm: string): Date => {
  const d = new Date()
  const [h, m] = hhmm.split(':').map(Number)
  d.setHours(h, m, 0, 0)
  return d
}

/** Date → 'HH:mm' (from MUI TimePicker), with a safe fallback. */
export const dateToTimeString = (d: Date | null, fallback = '09:00'): string =>
  d ? `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}` : fallback

/** ISO datetime → UTC 'HH:mm'. */
export const isoToUtcTime = (iso: string): string => {
  const d = new Date(iso)
  return minutesToTime(d.getUTCHours() * 60 + d.getUTCMinutes())
}

/** Returns updated startTime / endTime / date for an optimistic reschedule. */
export const applyReschedule = (
  booking: { startTime: string; endTime: string },
  startAt: string,
) => {
  const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
  const newStart = isoToUtcTime(startAt)
  return {
    date: startAt.split('T')[0],
    startTime: newStart,
    endTime: minutesToTime(timeToMinutes(newStart) + duration),
  }
}

/* ────────────────────────── Avatars / identity ────────────────────────── */

export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')

/** Deterministic 1-8 avatar colour from a string id (stable across renders). */
export const avatarColorFromId = (id: string): number => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return (h % 8) + 1
}
