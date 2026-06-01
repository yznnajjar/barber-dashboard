'use client'
import { useMemo, useState } from 'react'
import {
  addMonths, endOfMonth, endOfWeek, eachDayOfInterval, format,
  isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek, subMonths,
} from 'date-fns'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import {
  MiniWrap, MiniTop, MiniDow, MiniGrid, MiniDay,
} from './CalendarView.styled'

const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

interface Props {
  /** The currently selected day shown as solid. */
  value: Date
  /** Days that have bookings — gold dot under the number. */
  busyDays?: Set<string>
  onPick: (date: Date) => void
}

export default function MiniCalendar({ value, busyDays, onPick }: Props) {
  const [cursor, setCursor] = useState<Date>(value)

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [cursor])

  return (
    <MiniWrap>
      <MiniTop>
        <button type="button" onClick={() => setCursor((c) => subMonths(c, 1))} aria-label="Previous month">
          <ChevronLeftRounded fontSize="small" />
        </button>
        <b>{format(cursor, 'MMMM yyyy')}</b>
        <button type="button" onClick={() => setCursor((c) => addMonths(c, 1))} aria-label="Next month">
          <ChevronRightRounded fontSize="small" />
        </button>
      </MiniTop>
      <MiniDow>
        {DOW.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </MiniDow>
      <MiniGrid>
        {days.map((d) => {
          const key = format(d, 'yyyy-MM-dd')
          return (
            <MiniDay
              key={key}
              type="button"
              $mut={!isSameMonth(d, cursor)}
              $today={isToday(d)}
              $sel={isSameDay(d, value)}
              $has={busyDays?.has(key) ?? false}
              onClick={() => onPick(d)}
            >
              {format(d, 'd')}
            </MiniDay>
          )
        })}
      </MiniGrid>
    </MiniWrap>
  )
}
