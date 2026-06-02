import { isBefore, startOfDay } from 'date-fns'
import { dayKey } from '@/lib/utils'

export const isPastDate = (date: Date): boolean =>
  isBefore(startOfDay(date), startOfDay(new Date()))

export const isPastDateTime = (dateStr: string, timeStr: string): boolean => {
  const now = new Date()
  const todayStr = dayKey(now)
  if (dateStr !== todayStr) return false
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m <= now.getHours() * 60 + now.getMinutes()
}

export const isEndBeforeStart = (startStr: string, endStr: string): boolean => {
  const [sh, sm] = startStr.split(':').map(Number)
  const [eh, em] = endStr.split(':').map(Number)
  return eh * 60 + em <= sh * 60 + sm
}
