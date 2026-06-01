'use client'
import { useDraggable } from '@dnd-kit/core'
import { formatTime12, timeToMinutes } from '@/lib/utils'
import { START_HOUR, PX_PER_MIN, blockColors } from './calendarConfig'
import { Appt } from './CalendarView.styled'
import { BOOKING_STATUS_CANCELLED } from '@/constants'
import type { Booking } from '@/types'

interface Props {
  booking: Booking
  compact: boolean // week view shows time instead of service name
  columnId: string // staff id (day view) or date key (week view)
  onClick: () => void
}

export default function AppointmentBlock({ booking, compact, columnId, onClick }: Props) {
  const top = (timeToMinutes(booking.startTime) - START_HOUR * 60) * PX_PER_MIN
  const height = Math.max((timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)) * PX_PER_MIN - 4, 26)
  const c = blockColors(booking.status)

  // Cancelled bookings are not draggable.
  const draggable = booking.status !== BOOKING_STATUS_CANCELLED
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
      $strike={booking.status === BOOKING_STATUS_CANCELLED}
      $dragging={isDragging}
      $draggable={draggable}
      // A click and a drag both start with pointerdown; dnd-kit only activates
      // drag after the movement threshold, so a plain click still opens the drawer.
      onClick={() => { if (!isDragging) onClick() }}
      {...(draggable ? { ...listeners, ...attributes } : {})}
    >
      <div className="appt-name">{booking.customerName}</div>
      <div className="appt-svc">{compact ? formatTime12(booking.startTime) : booking.serviceName}</div>
    </Appt>
  )
}
