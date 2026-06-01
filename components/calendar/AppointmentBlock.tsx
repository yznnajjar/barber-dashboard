'use client'
import { useDraggable } from '@dnd-kit/core'
import { formatTime12, timeToMinutes } from '@/lib/utils'
import { START_HOUR, PX_PER_MIN, colorForBooking, type ColorMode } from './calendarConfig'
import { Appt } from './CalendarView.styled'
import type { Booking } from '@/types'

interface Props {
  booking: Booking
  compact: boolean
  columnId: string
  colorMode?: ColorMode
  onClick: () => void
}

export default function AppointmentBlock({ booking, compact, columnId, colorMode = 'status', onClick }: Props) {
  const top = (timeToMinutes(booking.startTime) - START_HOUR * 60) * PX_PER_MIN
  const height = Math.max((timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)) * PX_PER_MIN - 4, 26)
  const c = colorForBooking(booking, colorMode)
  const isInactive = booking.status === 'CANCELLED' || booking.status === 'NO_SHOW'

  const draggable = !isInactive
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: booking.id,
    data: { booking, columnId },
    disabled: !draggable,
  })

  return (
    <Appt
      ref={setNodeRef}
      $bg={c.bg}
      $color={c.fg}
      $top={top}
      $height={height}
      $strike={isInactive}
      $dragging={isDragging}
      $draggable={draggable}
      onClick={() => { if (!isDragging) onClick() }}
      {...(draggable ? { ...listeners, ...attributes } : {})}
    >
      <div className="appt-name">{booking.customerName}</div>
      <div className="appt-svc">{compact ? formatTime12(booking.startTime) : booking.serviceName}</div>
    </Appt>
  )
}
