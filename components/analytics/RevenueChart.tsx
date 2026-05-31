'use client'
import { useTranslations } from 'next-intl'
import { Card, Typography, Skeleton } from '@mui/material'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
} from 'recharts'
import { COLORS } from '@/lib/colors'
import { formatJDCompact } from '@/lib/utils'
import type { Analytics } from '@/types'

interface Props {
  series: Analytics['revenueSeries'] | undefined
  loading: boolean
}

export default function RevenueChart({ series, loading }: Props) {
  const t = useTranslations('analytics')
  return (
    <Card sx={{ p: 2.5 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>{t('revenueOverTime')}</Typography>
      {loading ? (
        <Skeleton variant="rounded" height={240} />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.hairline} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: COLORS.ink40 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: COLORS.ink40 }} axisLine={false} tickLine={false} />
            <RTooltip formatter={(v: number) => formatJDCompact(v)} contentStyle={{ borderRadius: 8, border: `1px solid ${COLORS.ink20}`, fontSize: 12 }} />
            <Line type="monotone" dataKey="value" stroke={COLORS.prince} strokeWidth={2.5} dot={{ r: 3, fill: COLORS.prince }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
