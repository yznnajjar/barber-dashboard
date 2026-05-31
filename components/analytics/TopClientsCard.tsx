'use client'
import { useTranslations } from 'next-intl'
import { Card, Typography, Box, Skeleton } from '@mui/material'
import UserAvatar from '@/components/shared/UserAvatar'
import { formatJDCompact } from '@/lib/utils'
import { ClientRow } from './AnalyticsView.styled'
import type { Analytics } from '@/types'

interface Props {
  clients: Analytics['topClients'] | undefined
  loading: boolean
}

export default function TopClientsCard({ clients, loading }: Props) {
  const t = useTranslations('analytics')
  return (
    <Card sx={{ p: 2.5 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>{t('topClients')}</Typography>
      {loading ? (
        <Skeleton variant="rounded" height={200} />
      ) : (
        <Box>
          {clients?.map((c, i) => (
            <ClientRow key={c.name} $last={i === clients.length - 1}>
              <UserAvatar name={c.name} color={c.avatarColor} size="sm" />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 400 }}>{c.visits} {t('visits')}</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatJDCompact(c.spend)}</Typography>
            </ClientRow>
          ))}
        </Box>
      )}
    </Card>
  )
}
