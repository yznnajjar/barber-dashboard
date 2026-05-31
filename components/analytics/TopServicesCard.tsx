'use client'
import { useTranslations } from 'next-intl'
import { Card, Typography, Box, Skeleton } from '@mui/material'
import { Bar, BarTrack, BarFill, BarRow } from './AnalyticsView.styled'
import type { Analytics } from '@/types'

interface Props {
  services: Analytics['topServices'] | undefined
  loading: boolean
}

export default function TopServicesCard({ services, loading }: Props) {
  const t = useTranslations('analytics')
  const max = Math.max(...(services?.map((s) => s.count) ?? [1]))

  return (
    <Card sx={{ p: 2.5 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>{t('topServices')}</Typography>
      {loading ? (
        <Skeleton variant="rounded" height={240} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {services?.map((s) => (
            <Bar key={s.name}>
              <BarRow>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{s.count}</Typography>
              </BarRow>
              <BarTrack>
                <BarFill style={{ width: `${(s.count / max) * 100}%` }} />
              </BarTrack>
            </Bar>
          ))}
        </Box>
      )}
    </Card>
  )
}
