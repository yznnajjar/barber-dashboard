'use client'
import { useTranslations } from 'next-intl'
import { Card, Box, Typography, IconButton, Tooltip, Fade } from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { formatDuration } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import { PositionBadge, WaitMeta } from './QueueView.styled'
import type { QueueEntry } from '@/types'

interface Props {
  entry: QueueEntry
  onRemove: (id: string) => void
}

export default function WaitingCard({ entry, onRemove }: Props) {
  const t = useTranslations('queue')
  return (
    <Fade in>
      <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <PositionBadge>{entry.position}</PositionBadge>
        <UserAvatar name={entry.customerName} color={entry.avatarColor} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600 }}>{entry.customerName}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{entry.serviceName}</Typography>
        </Box>
        <WaitMeta>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatDuration(entry.estimatedWait)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 400 }}>
            {t('joined')} {formatDistanceToNow(parseISO(entry.joinedAt), { addSuffix: true })}
          </Typography>
        </WaitMeta>
        <Tooltip title="Remove">
          <IconButton size="small" onClick={() => onRemove(entry.id)} sx={{ ml: 0.5 }}>
            <CloseRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </Card>
    </Fade>
  )
}
