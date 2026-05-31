'use client'
import { useTranslations } from 'next-intl'
import { Card, Typography, Button, Skeleton, CircularProgress } from '@mui/material'
import CallRounded from '@mui/icons-material/CallRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import EmptyState from '@/components/shared/EmptyState'
import { HeroCaption, HeroNumber, HeroName } from './QueueView.styled'
import type { QueueEntry } from '@/types'

interface Props {
  next: QueueEntry | undefined
  loading: boolean
  calling: boolean
  onCallNext: () => void
}

export default function CallNextHero({ next, loading, calling, onCallNext }: Props) {
  const t = useTranslations('queue')

  return (
    <Card sx={{ p: 4, textAlign: 'center', position: 'sticky', top: 88 }}>
      {loading ? (
        <Skeleton variant="rounded" height={260} />
      ) : next ? (
        <>
          <HeroCaption>{t('next')}</HeroCaption>
          <HeroNumber>{next.position}</HeroNumber>
          <HeroName>{next.customerName}</HeroName>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{next.serviceName}</Typography>
          <Button
            fullWidth variant="contained" size="large"
            startIcon={calling ? <CircularProgress size={18} color="inherit" /> : <CallRounded />}
            disabled={calling} onClick={onCallNext}
            sx={{ height: 52, fontSize: 16 }}
          >
            {t('callNext')}
          </Button>
        </>
      ) : (
        <EmptyState icon={<GroupsRounded />} title={t('empty')} subtitle={t('emptySub')} />
      )}
    </Card>
  )
}
