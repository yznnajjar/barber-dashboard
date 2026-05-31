'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Drawer, Box, Typography, IconButton, Divider, TextField } from '@mui/material'
import CloseRounded from '@mui/icons-material/CloseRounded'
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded'
import { useUpdateClientNotes } from '@/hooks/mutations/useUpdateClientNotes'
import { formatJD, formatDate } from '@/lib/utils'
import UserAvatar from '@/components/shared/UserAvatar'
import {
  DrawerHead, StatTile, StatTileLabel, StatTileValue, StatTileGrid,
  SectionLabel, HistoryRow, SavedFlag,
} from './ClientsView.styled'
import type { Client } from '@/types'

export default function ClientProfileDrawer({ client, onClose }: { client: Client | null; onClose: () => void }) {
  const t = useTranslations('clients')
  const updateNotes = useUpdateClientNotes()
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => { setNotes(client?.notes ?? ''); setSaved(false) }, [client])

  const saveNotes = () => {
    if (!client || notes === client.notes) return
    updateNotes.mutate(
      { id: client.id, notes },
      { onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 1800) } },
    )
  }

  if (!client) return <Drawer anchor="right" open={false} onClose={onClose} />

  const tiles = [
    { label: t('visits'), value: `${client.totalVisits}` },
    { label: t('spend'), value: formatJD(client.totalSpend) },
    { label: t('avgSpend'), value: formatJD(client.totalSpend / Math.max(client.totalVisits, 1)) },
  ]

  return (
    <Drawer anchor="right" open={!!client} onClose={onClose} PaperProps={{ sx: { width: 480 } }}>
      <DrawerHead>
        <UserAvatar name={client.name} color={client.avatarColor} size="lg" />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3">{client.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{client.phone}</Typography>
        </Box>
        <IconButton onClick={onClose}><CloseRounded /></IconButton>
      </DrawerHead>

      <Box sx={{ p: 3, overflowY: 'auto' }}>
        <StatTileGrid>
          {tiles.map((s) => (
            <StatTile key={s.label}>
              <StatTileLabel>{s.label}</StatTileLabel>
              <StatTileValue>{s.value}</StatTileValue>
            </StatTile>
          ))}
        </StatTileGrid>

        <SectionLabel>{t('history')}</SectionLabel>
        <Box sx={{ mt: 1, mb: 3 }}>
          {client.history.map((h) => (
            <HistoryRow key={h.id}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{h.serviceName}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 400 }}>{formatDate(h.date)} · {h.staffName}</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatJD(h.amount)}</Typography>
            </HistoryRow>
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SectionLabel>{t('notes')}</SectionLabel>
          {saved && <SavedFlag><CheckCircleRounded sx={{ fontSize: 14 }} /> Saved</SavedFlag>}
        </Box>
        <TextField
          multiline minRows={3} fullWidth value={notes}
          onChange={(e) => setNotes(e.target.value)} onBlur={saveNotes}
          placeholder={t('notesPlaceholder')} sx={{ mt: 1 }}
        />
      </Box>
    </Drawer>
  )
}
