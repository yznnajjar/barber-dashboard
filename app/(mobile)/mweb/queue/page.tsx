'use client';

import { useState, useEffect } from 'react';
import { MobileLayout } from '../_layouts';
import { Box, Button, Card, Chip, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { useSalons, useQueue } from '@/features/salons/salons.queries';
import { useQueueMutations } from '@/features/queue/queue.queries';
import { QUEUE_STATUS_BADGE, ACTIVE_QUEUE_STATUSES, QUEUE_STATUS } from '@/constants/status';
import { QUEUE_STRINGS, COMMON, BRAND } from '@/constants/text';
import type { QueueEntry } from '@/types';
import * as styles from './page.styles';

export default function MobileQueuePage() {
  const { data: salonsData } = useSalons();
  const salons = salonsData?.data || [];
  const [selectedSalon, setSelectedSalon] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (salons.length > 0 && !selectedSalon) setSelectedSalon(salons[0].id);
  }, [salons, selectedSalon]);

  const { data: queue } = useQueue(selectedSalon || undefined);
  const queueEntries = queue || [];
  const { callNext, serve, done, leave } = useQueueMutations(selectedSalon);

  useEffect(() => { setLastUpdate(new Date()); }, [queueEntries]);

  const active = queueEntries.filter((q: QueueEntry) =>
    (ACTIVE_QUEUE_STATUSES as readonly string[]).includes(q.status)
  );
  const waiting = active.filter((q) => q.status === QUEUE_STATUS.WAITING).length;
  const serving = active.filter((q) => q.status === QUEUE_STATUS.SERVING).length;
  const totalWait = active.reduce((s, e) => s + (e.service?.durationMin || 30), 0);

  return (
    <MobileLayout
      title="Live Queue"
      subtitle={
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Box component="span" sx={styles.liveDot} />
          Live · {lastUpdate.toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Box>
      }
    >
      {salons.length > 1 && (
        <Select value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)} sx={{ mb: 1, bgcolor: 'background.paper' }}>
          {salons.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
        </Select>
      )}

      <Box sx={{ mb: 4 }}>
        <Button fullWidth size="large" onClick={() => callNext.mutate()} disabled={callNext.isPending || waiting === 0}>
          {callNext.isPending ? <CircularProgress size={18} sx={{ color: 'background.paper' }} /> : QUEUE_STRINGS.CALL_NEXT}
        </Button>
      </Box>

      <Box sx={styles.statsGrid}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography sx={{ ...styles.statValue, color: 'warning.main' }}>
            {waiting}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Waiting
          </Typography>
        </Card>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography sx={{ ...styles.statValue, color: 'success.main' }}>
            {serving}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Serving
          </Typography>
        </Card>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography sx={{ ...styles.statValue, color: 'text.primary' }}>
            {totalWait}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Min total
          </Typography>
        </Card>
      </Box>

      <Box sx={styles.queueList}>
        {active.length === 0 ? (
          <Box sx={styles.emptyState}>
            {QUEUE_STRINGS.EMPTY}
          </Box>
        ) : (
          active.map((entry: QueueEntry) => (
            <Box
              key={entry.id}
              sx={{
                ...styles.queueCard,
                borderLeftColor: entry.status === QUEUE_STATUS.SERVING ? 'success.main' : entry.status === QUEUE_STATUS.CALLED ? 'info.main' : 'warning.main',
              }}
            >
              <Box sx={styles.cardHeader}>
                <Typography sx={{ fontSize: 14, fontWeight: FONT_WEIGHT.BOLD, color: entry.status === QUEUE_STATUS.SERVING ? 'success.main' : entry.status === QUEUE_STATUS.CALLED ? 'info.main' : 'warning.main' }}>
                  #{entry.position}
                </Typography>
                <Chip
                  label={entry.status.toLowerCase()}
                  color={entry.status === QUEUE_STATUS.SERVING ? 'success' : entry.status === QUEUE_STATUS.CALLED ? 'info' : 'warning'}
                  size="small"
                />
              </Box>
              <Typography sx={{ fontSize: FONT_SIZE.MD, fontWeight: FONT_WEIGHT.SEMIBOLD, color: 'text.primary' }}>
                {entry.customer?.name || COMMON.CUSTOMER_FALLBACK}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                {entry.service?.name || 'Walk-in'}
                {entry.staff && ` · ${entry.staff.name}`}
              </Typography>
              <Box sx={styles.waitBadge}>
                ⏱ ~{entry.estimatedWaitMin || 0} min wait
              </Box>
              <Box sx={styles.actionButtons}>
                {entry.status === QUEUE_STATUS.CALLED && (
                  <Button variant="contained" color="success" size="small" onClick={() => serve.mutate(entry.id)} sx={{ minHeight: 44 }}>Start Serving</Button>
                )}
                {entry.status === QUEUE_STATUS.SERVING && (
                  <Button variant="outlined" size="small" onClick={() => done.mutate(entry.id)} sx={{ minHeight: 44 }}>Mark Done</Button>
                )}
                <Button variant="text" size="small" onClick={() => leave.mutate(entry.id)} sx={{ minHeight: 44 }}>Remove</Button>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </MobileLayout>
  );
}
