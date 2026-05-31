'use client'
import { useTranslations } from 'next-intl'
import { Card, Typography, Skeleton } from '@mui/material'
import { HEATMAP_RAMP } from '@/lib/colors'
import { HeatGrid, HeatLabel, HeatSlotLabel, HeatCell, HeatRowGroup } from './AnalyticsView.styled'
import type { Analytics } from '@/types'

// 12 half-day slots; label every other one (9,11,1,3,5,7).
const SLOT_LABELS = ['9', '', '11', '', '1', '', '3', '', '5', '', '7', '']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface Props {
  heatmap: Analytics['heatmap'] | undefined
  loading: boolean
}

export default function BusyHoursHeatmap({ heatmap, loading }: Props) {
  const t = useTranslations('analytics')
  return (
    <Card sx={{ p: 2.5 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>{t('busyHours')}</Typography>
      {loading ? (
        <Skeleton variant="rounded" height={200} />
      ) : (
        <HeatGrid>
          <span />
          {SLOT_LABELS.map((l, i) => <HeatSlotLabel key={i}>{l}</HeatSlotLabel>)}
          {heatmap?.map((row, r) => (
            <HeatRowGroup key={r}>
              <HeatLabel>{DAY_LABELS[r]}</HeatLabel>
              {row.map((v, c) => (
                <HeatCell key={c} title={`${v}`} style={{ background: HEATMAP_RAMP[v] }} />
              ))}
            </HeatRowGroup>
          ))}
        </HeatGrid>
      )}
    </Card>
  )
}
