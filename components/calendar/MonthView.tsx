'use client'
import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isToday, format,
} from 'date-fns'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import type { Booking } from '@/types'

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid ${COLORS.ink20};
  border-radius: 12px;
  overflow: hidden;
  background: ${COLORS.white};
`

const DayHeader = styled.div`
  padding: 10px 8px;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${COLORS.ink40};
  background: ${COLORS.pebble};
  border-bottom: 1px solid ${COLORS.ink20};
`

const DayCell = styled.button<{ $inMonth: boolean; $isToday: boolean; $busy: number }>`
  border: 0;
  border-bottom: 1px solid ${COLORS.ink20};
  border-right: 1px solid ${COLORS.ink20};
  background: ${({ $busy, $isToday }) =>
    $isToday ? COLORS.princeTint : $busy > 0 ? `rgba(123,105,255,${Math.min($busy * 0.04, 0.16)})` : COLORS.white};
  min-height: 88px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
  transition: background 0.15s;

  &:nth-child(7n) { border-right: none; }
  &:hover { background: ${COLORS.pebbleHover}; }
`

const DayNum = styled.span<{ $inMonth: boolean; $isToday: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: ${({ $isToday }) => ($isToday ? 700 : 600)};
  color: ${({ $inMonth, $isToday }) =>
    $isToday ? COLORS.white : $inMonth ? COLORS.ink : COLORS.ink40};
  background: ${({ $isToday }) => ($isToday ? COLORS.prince : 'transparent')};
  margin-bottom: 4px;
`

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${COLORS.princeDark};
  background: ${COLORS.prince20};
  border-radius: 10px;
  padding: 1px 6px;
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
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
    return eachDayOfInterval({ start: calStart, end: calEnd })
  }, [anchor])

  const countsByDay = useMemo(() => {
    const map: Record<string, number> = {}
    bookings.forEach((b) => {
      map[b.date] = (map[b.date] ?? 0) + 1
    })
    return map
  }, [bookings])

  return (
    <Box>
      <MonthGrid>
        {WEEKDAYS.map((d) => (
          <DayHeader key={d}>{d}</DayHeader>
        ))}
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd')
          const count = countsByDay[key] ?? 0
          const inMonth = isSameMonth(day, anchor)
          const today = isToday(day)
          return (
            <DayCell
              key={key}
              $inMonth={inMonth}
              $isToday={today}
              $busy={count}
              onClick={() => onDayClick(day)}
            >
              <DayNum $inMonth={inMonth} $isToday={today}>
                {format(day, 'd')}
              </DayNum>
              {inMonth && count > 0 && <Badge>{count}</Badge>}
            </DayCell>
          )
        })}
      </MonthGrid>
    </Box>
  )
}
