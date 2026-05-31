'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, CircularProgress, Skeleton } from '@mui/material'
import CallRounded from '@mui/icons-material/CallRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import { useQueue } from '@/hooks/queries/useQueue'
import { useCallNext } from '@/hooks/mutations/useCallNext'
import { useRemoveFromQueue } from '@/hooks/mutations/useRemoveFromQueue'
import { MOCK_SALON_ID } from '@/constants'
import EmptyState from '@/components/shared/EmptyState'
import { SectionHead } from '@/components/layout/mweb/MwebShell.styled'
import MwebQueueRow from './MwebQueueRow'
import MwebActionSheet from './MwebActionSheet'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'
import type { QueueEntry } from '@/types'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StickyCta = styled.div`
  position: sticky;
  bottom: 0;
  padding: 12px 0 4px;
  background: linear-gradient(to top, ${COLORS.pebble} 70%, transparent);
`

export default function MwebQueueView() {
  const t = useTranslations('queue')
  const { data: queue, isLoading } = useQueue(MOCK_SALON_ID)
  const callNext = useCallNext()
  const removeFromQueue = useRemoveFromQueue()
  const [selected, setSelected] = useState<QueueEntry | null>(null)

  const count = queue?.length ?? 0

  return (
    <>
      <SectionHead>
        <span className="label">{t('title')} · {count} {t('waiting')}</span>
        <span style={{ fontSize: 12, color: COLORS.ink40 }}>← {t('callNext')}</span>
      </SectionHead>

      {isLoading ? (
        <List>
          {[0, 1, 2].map((i) => <Skeleton key={i} variant="rounded" height={66} sx={{ borderRadius: '14px' }} />)}
        </List>
      ) : count === 0 ? (
        <EmptyState icon={<GroupsRounded />} title={t('empty')} subtitle={t('emptySub')} />
      ) : (
        <>
          <List>
            {queue!.map((entry, i) => (
              <MwebQueueRow
                key={entry.id}
                entry={entry}
                isNext={i === 0}
                onRemove={(id) => removeFromQueue.mutate(id)}
                onTap={setSelected}
              />
            ))}
          </List>

          <StickyCta>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={callNext.isPending ? <CircularProgress size={18} color="inherit" /> : <CallRounded />}
              disabled={callNext.isPending}
              onClick={() => callNext.mutate()}
              sx={{ height: 56, fontSize: 16 }}
            >
              {t('callNext')}
            </Button>
          </StickyCta>
        </>
      )}

      <MwebActionSheet
        entry={selected}
        onClose={() => setSelected(null)}
        onCallNext={() => { callNext.mutate(); setSelected(null) }}
        onRemove={(id) => { removeFromQueue.mutate(id); setSelected(null) }}
      />
    </>
  )
}
