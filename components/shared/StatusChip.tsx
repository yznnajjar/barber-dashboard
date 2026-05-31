'use client'
import { Chip } from '@mui/material'
import { STATUS_COLORS } from '@/lib/colors'
import type { BookingStatus } from '@/types'

export default function StatusChip({ status }: { status: BookingStatus }) {
  const s = STATUS_COLORS[status]
  return (
    <Chip
      size="small"
      label={s.label}
      sx={{
        backgroundColor: s.bg,
        color: s.fg,
        fontWeight: 600,
        height: 22,
        textDecoration: status === 'CANCELLED' ? 'line-through' : 'none',
      }}
    />
  )
}
