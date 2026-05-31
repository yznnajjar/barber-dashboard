'use client'
import { useTranslations } from 'next-intl'
import { Box, Card, Typography, Skeleton } from '@mui/material'
import { useQueue } from '@/hooks/queries/useQueue'
import { useCallNext } from '@/hooks/mutations/useCallNext'
import { useRemoveFromQueue } from '@/hooks/mutations/useRemoveFromQueue'
import { MOCK_SALON_ID } from '@/constants'
import PageHeader from '@/components/shared/PageHeader'
import ErrorState from '@/components/shared/ErrorState'
import CallNextHero from './CallNextHero'
import WaitingCard from './WaitingCard'
import { QueueGrid, WaitList } from './QueueView.styled'

export default function QueueView() {
  const t = useTranslations('queue')
  const { data: queue, isLoading, isError } = useQueue(MOCK_SALON_ID)
  const callNext = useCallNext()
  const removeFromQueue = useRemoveFromQueue()

  if (isError) return <ErrorState />

  const next = queue?.[0]
  const rest = queue?.slice(1) ?? []

  return (
    <Box>
      <PageHeader title={t('title')} subtitle={`${queue?.length ?? 0} ${t('waiting')}`} />

      <QueueGrid>
        <CallNextHero next={next} loading={isLoading} calling={callNext.isPending} onCallNext={() => callNext.mutate()} />

        <WaitList>
          {isLoading ? (
            [0, 1, 2].map((i) => <Skeleton key={i} variant="rounded" height={72} />)
          ) : (
            rest.map((entry) => (
              <WaitingCard key={entry.id} entry={entry} onRemove={(id) => removeFromQueue.mutate(id)} />
            ))
          )}
          {!isLoading && rest.length === 0 && next && (
            <Card sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="body2">No one else is waiting.</Typography>
            </Card>
          )}
        </WaitList>
      </QueueGrid>
    </Box>
  )
}
