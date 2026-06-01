'use client'
import { formatTime12, timeToMinutes } from '@/lib/utils'
import { START_HOUR, PX_PER_MIN } from './calendarConfig'
import { Appt } from './CalendarView.styled'
import { COLORS } from '@/lib/colors'
import type { BlockedTime } from '@/types'

interface Props {
  block: BlockedTime
  onClick: () => void
}

export default function BlockedTimeBlock({ block, onClick }: Props) {
  const top = (timeToMinutes(block.startTime) - START_HOUR * 60) * PX_PER_MIN
  const height = Math.max((timeToMinutes(block.endTime) - timeToMinutes(block.startTime)) * PX_PER_MIN - 4, 26)

  return (
    <Appt
      $bg={COLORS.pebble}
      $color={COLORS.ink40}
      $top={top}
      $height={height}
      $dragging={false}
      $draggable={false}
      $strike={false}
      onClick={onClick}
      style={{ borderLeftStyle: 'dashed', borderLeftColor: COLORS.ink40 }}
    >
      <div className="appt-name" style={{ fontWeight: 600 }}>{block.type}</div>
      <div className="appt-svc">{formatTime12(block.startTime)} – {formatTime12(block.endTime)}</div>
      {block.notes && <div className="appt-svc" style={{ fontSize: 10, opacity: 0.7 }}>{block.notes}</div>}
    </Appt>
  )
}
