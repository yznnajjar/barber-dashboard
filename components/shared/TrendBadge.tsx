'use client'
import ArrowUpwardRounded from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded'
import { Box } from '@mui/material'
import { COLORS } from '@/lib/colors'

export default function TrendBadge({ value }: { value: number }) {
  const up = value >= 0
  const Icon = up ? ArrowUpwardRounded : ArrowDownwardRounded
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: up ? COLORS.success : COLORS.error, fontSize: 12, fontWeight: 600 }}>
      <Icon sx={{ fontSize: 14 }} />
      {Math.abs(value)}%
    </Box>
  )
}
