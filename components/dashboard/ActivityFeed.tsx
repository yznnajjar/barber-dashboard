'use client'
import { useTranslations } from 'next-intl'
import { Card, Box, Typography } from '@mui/material'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { CardHead, ActivityRow, ActivityDot } from './DashboardView.styled'
import type { ActivityItem } from '@/types'

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const t = useTranslations('dashboard')
  return (
    <Card sx={{ p: 0 }}>
      <CardHead>
        <Typography variant="h3">{t('recentActivity')}</Typography>
      </CardHead>
      <Box sx={{ px: 2.5, py: 1.5 }}>
        {items.map((a, i) => (
          <ActivityRow key={a.id} $last={i === items.length - 1}>
            <ActivityDot $type={a.type} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>{a.text}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 400 }}>
                {formatDistanceToNow(parseISO(a.time), { addSuffix: true })}
              </Typography>
            </Box>
          </ActivityRow>
        ))}
      </Box>
    </Card>
  )
}
