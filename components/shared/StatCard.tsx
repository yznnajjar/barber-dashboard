'use client'
import { Card, Box, Typography, Skeleton } from '@mui/material'
import TrendBadge from './TrendBadge'
import { COLORS } from '@/lib/colors'

interface Props {
  label: string
  value: string
  icon: React.ReactNode
  trend?: number
  loading?: boolean
  size?: 'md' | 'sm'
}

export default function StatCard({ label, value, icon, trend, loading, size = 'md' }: Props) {
  return (
    <Card sx={{ p: 2.25, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: COLORS.prince20, color: 'primary.main', display: 'grid', placeItems: 'center', mb: 0.5 }}>
        {icon}
      </Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </Typography>
      {loading ? (
        <Skeleton width={90} height={size === 'md' ? 38 : 30} />
      ) : (
        <Typography sx={{ fontSize: size === 'md' ? 28 : 22, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {value}
        </Typography>
      )}
      {typeof trend === 'number' && !loading && (
        <Box><TrendBadge value={trend} /> <Typography component="span" variant="caption" sx={{ color: 'text.disabled' }}>vs prev</Typography></Box>
      )}
    </Card>
  )
}
