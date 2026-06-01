'use client'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import { Box, Card, Typography, Skeleton } from '@mui/material'
import { useQueue } from '@/hooks/queries/useQueue'
import { useCallNext } from '@/hooks/mutations/useCallNext'
import { useRemoveFromQueue } from '@/hooks/mutations/useRemoveFromQueue'
import { useAuthStore } from '@/store/authStore'
import { queueSocket } from '@/lib/socket'
import { queueEntryDtoToQueueEntry } from '@/lib/transform'
import { QUERY_KEY_QUEUE } from '@/constants'
import PageHeader from '@/components/shared/PageHeader'
import ErrorState from '@/components/shared/ErrorState'
import CallNextHero from './CallNextHero'
import WaitingCard from './WaitingCard'
import { QueueGrid, WaitList } from './QueueView.styled'

export default function QueueView() {
  const t = useTranslations('queue')
  const queryClient = useQueryClient()
  const salonId = useAuthStore((s) => s.salonId)
  const { data: queue, isLoading, isError } = useQueue()
  const callNext = useCallNext()
  const removeFromQueue = useRemoveFromQueue()

  useEffect(() => {
    if (!salonId) return
    queueSocket.connect()
    queueSocket.emit('join-salon', salonId)

    const handleUpdate = (data: unknown) => {
      if (!Array.isArray(data)) return
      const entries = data.map((d: Record<string, unknown>) =>
        queueEntryDtoToQueueEntry({
          id: String(d.id ?? ''),
          position: Number(d.position ?? 0),
          name: String(d.name ?? ''),
          service: String(d.service ?? ''),
          estimatedWaitMin: Number(d.estimatedWaitMin ?? 0),
          joinedAt: String(d.joinedAt ?? new Date().toISOString()),
          status: String(d.status ?? 'WAITING'),
        }),
      )
      queryClient.setQueryData([QUERY_KEY_QUEUE], entries)
    }

    queueSocket.on('queue-updated', handleUpdate)
    return () => {
      queueSocket.off('queue-updated', handleUpdate)
      queueSocket.disconnect()
    }
  }, [salonId, queryClient])

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
