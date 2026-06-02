'use client'
import { useState } from 'react'
import { useSensor, useSensors, PointerSensor, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { isBefore, startOfDay } from 'date-fns'
import { useRescheduleBooking } from '@/hooks/mutations/useRescheduleBooking'
import { timeToMinutes, minutesToTime, formatTime12, dayKey } from '@/lib/utils'
import { snapDeltaToMinutes, clampStartMinutes, nowPosition } from '@/components/calendar/calendarConfig'
import { CALENDAR_VIEW_WEEK } from '@/constants'
import type { Booking } from '@/types'
import type { CalendarViewType } from '@/constants'

interface ToastState {
  message: string
  severity: 'success' | 'error'
}

interface Options {
  view: CalendarViewType
}

export function useCalendarDnD({ view }: Options) {
  const reschedule = useRescheduleBooking()
  const [dragging, setDragging] = useState<Booking | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const onDragStart = (e: DragStartEvent) => {
    setDragging((e.active.data.current?.booking as Booking) ?? null)
  }

  const onDragEnd = (e: DragEndEvent) => {
    const booking = e.active.data.current?.booking as Booking | undefined
    setDragging(null)
    if (!booking) return

    const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
    const deltaMin = snapDeltaToMinutes(e.delta.y)
    const newStart = clampStartMinutes(timeToMinutes(booking.startTime) + deltaMin, duration)

    const targetColumn = (e.over?.data.current?.columnId as string | undefined) ?? null
    const sourceColumn = (e.active.data.current?.columnId as string | undefined) ?? null
    const movedColumn = targetColumn && targetColumn !== sourceColumn

    if (deltaMin === 0 && !movedColumn) return

    const newDate = (view === CALENDAR_VIEW_WEEK && movedColumn) ? targetColumn! : booking.date

    if (isBefore(startOfDay(new Date(newDate)), startOfDay(new Date()))) {
      setToast({ message: 'Cannot move appointment to a past date', severity: 'error' })
      return
    }

    const todayStr = dayKey(new Date())
    if (newDate === todayStr) {
      const { nowMin } = nowPosition()
      if (newStart <= nowMin) {
        setToast({ message: 'Cannot move appointment to a past time', severity: 'error' })
        return
      }
    }

    const newStartAt = `${newDate}T${minutesToTime(newStart)}:00.000Z`
    reschedule.mutate(
      { id: booking.id, startAt: newStartAt },
      {
        onSuccess: () =>
          setToast({
            message: `${booking.customerName} → ${formatTime12(minutesToTime(newStart))}`,
            severity: 'success',
          }),
      },
    )
  }

  return { dragging, toast, setToast, sensors, onDragStart, onDragEnd }
}
