'use client'
import { memo } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { formatTime12, formatJD, timeToMinutes } from '@/lib/utils'
import { colorForBooking, blockTopPx, blockHeightPx, type ColorMode } from './calendarConfig'
import { STATUS_COLORS } from '@/lib/colors'
import { Appt } from './CalendarView.styled'
import type { Booking } from '@/types'

interface Props {
  booking: Booking
  compact: boolean
  columnId: string
  colorMode?: ColorMode
  /** Distinct per-staff colour, used when colorMode is 'staff'. */
  staffColor?: { bg: string; fg: string }
  /** Service price in JD, for the block footer. */
  price?: number
  onClick: (anchor: HTMLElement) => void
}

const AppointmentBlock = memo(function AppointmentBlock({ booking, compact, columnId, colorMode = 'status', staffColor, price, onClick }: Props) {
  const top = blockTopPx(booking.startTime)
  const height = blockHeightPx(booking.startTime, booking.endTime)
  const c = colorMode === 'staff' && staffColor ? staffColor : colorForBooking(booking, colorMode)
  const isInactive = booking.status === 'CANCELLED' || booking.status === 'NO_SHOW'
  const duration = timeToMinutes(booking.endTime) - timeToMinutes(booking.startTime)
  const statusColor = STATUS_COLORS[booking.status].fg

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
      onClick={(e) => { if (!isDragging) onClick(e.currentTarget) }}
      {...(draggable ? { ...listeners, ...attributes } : {})}
    >
      <span className="appt-dot" style={{ background: statusColor }} />
      <div className="appt-tm">{formatTime12(booking.startTime)}–{formatTime12(booking.endTime)} · {duration} min</div>
      <div className="appt-name">{booking.customerName}</div>
      {!compact && <div className="appt-svc">{booking.serviceName}</div>}
      {!compact && price != null && (
        <div className="appt-foot">
          <span className="appt-price">{formatJD(price)}</span>
        </div>
      )}
    </Appt>
  )
})

export default AppointmentBlock
