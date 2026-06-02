'use client'
import { useMemo } from 'react'
import { Box } from '@mui/material'
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isToday, format,
} from 'date-fns'
import styled from 'styled-components'
import { dayKey, formatTime12 } from '@/lib/utils'
import { WEEK_START_DAY, colorForBooking } from './calendarConfig'
import { FZ } from './CalendarView.styled'
import type { Booking } from '@/types'

const MonthGrid = styled.div`
  font-family: ${FZ.font};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid ${FZ.line2};
  border-radius: 14px;
  overflow: hidden;
  background: ${FZ.surf};
  box-shadow: ${FZ.shadow};
`

const DayHeader = styled.div`
  padding: 10px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${FZ.ink3};
  background: ${FZ.surf};
  border-bottom: 1px solid ${FZ.line2};
  border-right: 1px solid ${FZ.line};

  &:nth-child(7) { border-right: none; }
`

const DayCell = styled.button<{ $inMonth: boolean }>`
  border: 0;
  border-bottom: 1px solid ${FZ.line};
  border-right: 1px solid ${FZ.line};
  background: ${({ $inMonth }) => ($inMonth ? FZ.surf : FZ.surf2)};
  min-height: 108px;
  padding: 7px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 3px;
  font-family: inherit;
  overflow: hidden;
  transition: background 0.15s;

  &:nth-child(7n) { border-right: none; }
  &:hover { background: #faf7ff; }
`

const DayNum = styled.span<{ $inMonth: boolean; $isToday: boolean }>`
  align-self: flex-start;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: ${({ $inMonth }) => ($inMonth ? 700 : 500)};
  color: ${({ $inMonth, $isToday }) =>
    $isToday ? FZ.surf : $inMonth ? FZ.ink : FZ.ink3};
  background: ${({ $isToday }) => ($isToday ? FZ.violet : 'transparent')};
`

const Chip = styled.span<{ $bg: string; $fg: string }>`
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  padding: 3px 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-left: 2px solid ${({ $fg }) => $fg};
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  text-align: start;
`

const More = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  color: ${FZ.ink3};
  padding: 1px 5px;
  text-align: start;
`

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface Props {
  anchor: Date
  bookings: Booking[]
  onDayClick: (date: Date) => void
}

export default function MonthView({ anchor, bookings, onDayClick }: Props) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(anchor)
    const monthEnd = endOfMonth(anchor)
    const calStart = startOfWeek(monthStart, { weekStartsOn: WEEK_START_DAY })
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: WEEK_START_DAY })
    return eachDayOfInterval({ start: calStart, end: calEnd })
  }, [anchor])

  const byDay = useMemo(() => {
    const map: Record<string, Booking[]> = {}
    bookings.forEach((b) => {
      ;(map[b.date] ??= []).push(b)
    })
    Object.values(map).forEach((list) => list.sort((a, b) => a.startTime.localeCompare(b.startTime)))
    return map
  }, [bookings])

  return (
    <Box>
      <MonthGrid>
        {WEEKDAYS.map((d) => (
          <DayHeader key={d}>{d}</DayHeader>
        ))}
        {days.map((day) => {
          const key = dayKey(day)
          const items = byDay[key] ?? []
          const inMonth = isSameMonth(day, anchor)
          const today = isToday(day)
          return (
            <DayCell
              key={key}
              $inMonth={inMonth}
              onClick={() => onDayClick(day)}
            >
              <DayNum $inMonth={inMonth} $isToday={today}>
                {format(day, 'd')}
              </DayNum>
              {items.slice(0, 3).map((b) => {
                const c = colorForBooking(b, 'service')
                return (
                  <Chip key={b.id} $bg={c.bg} $fg={c.fg}>
                    {formatTime12(b.startTime)} {b.customerName.split(' ')[0]}
                  </Chip>
                )
              })}
              {items.length > 3 && <More>+{items.length - 3} more</More>}
            </DayCell>
          )
        })}
      </MonthGrid>
    </Box>
  )
}
