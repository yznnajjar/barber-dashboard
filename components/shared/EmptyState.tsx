'use client'
import { Box, Typography } from '@mui/material'
import { COLORS } from '@/lib/colors'

interface Props {
  icon: React.ReactNode
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export default function EmptyState({ icon, title, subtitle, action }: Props) {
  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
      <Box
        sx={{
          width: 64, height: 64, borderRadius: '18px', mx: 'auto', mb: 2,
          display: 'grid', placeItems: 'center',
          background: COLORS.prince20, color: 'primary.main',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h3" sx={{ mb: 0.5 }}>{title}</Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{subtitle}</Typography>
      )}
      {action}
    </Box>
  )
}
