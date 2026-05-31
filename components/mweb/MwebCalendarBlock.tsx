'use client'
import { useDraggable } from '@dnd-kit/core'
import { formatTime12, timeToMinutes } from '@/lib/utils'
import { START_HOUR, PX_PER_MIN, blockColors } from '@/components/calendar/calendarConfig'
import { Block } from './MwebCalendarView.styled'
import type { Booking } from '@/types'

interface Props {
  booking: Booking
  onClick: () => void
}

/** Mobile day-view block: vertical drag only (one staff column at a time). */
export default function MwebCalendarBlock({ booking, onClick }: Props) {
  const top = (timeToMinutes(booking.startTime) - START_HOUR * 60) * PX_PER_MIN
  const height = Math.max(
    (timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)) * PX_PER_MIN - 4,
    30,
  )
  const c = blockColors(booking.status)
  const draggable = booking.status !== 'CANCELLED'

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: booking.id,
    data: { booking },
    disabled: !draggable,
  })

  return (
    <Block
      ref={setNodeRef}
      $bg={c.bg}
      $fg={c.fg}
      $top={top}
      $height={height}
      $strike={booking.status === 'CANCELLED'}
      $dragging={isDragging}
      $draggable={draggable}
      onClick={() => { if (!isDragging) onClick() }}
      {...(draggable ? { ...listeners, ...attributes } : {})}
    >
      <div className="b-name">{booking.customerName}</div>
      <div className="b-svc">{formatTime12(booking.startTime)} · {booking.serviceName}</div>
    </Block>
  )
}
