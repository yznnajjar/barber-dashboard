'use client';

import { useState, useEffect } from 'react';
import {
  Box, Typography, Chip, CircularProgress, Select, MenuItem, Button,
} from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { DesktopLayout, PageHeader, PageTitle, PageSubtitle, PageActions } from '../_layouts';
import { styles } from './_components/queue.styles';
import { useSalons, useQueue } from '@/features/salons/salons.queries';
import { useQueueMutations } from '@/features/queue/queue.queries';
import { ACTIVE_QUEUE_STATUSES, QUEUE_STATUS } from '@/constants/status';
import { QUEUE_STRINGS, COMMON, BRAND } from '@/constants/text';
import type { QueueEntry } from '@/types';

import { queueStatusChipColor } from '@/constants/chip-colors';

export default function QueuePage() {
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

  useEffect(() => {
    setLastUpdate(new Date());
  }, [queueEntries]);

  const active = queueEntries.filter((q: QueueEntry) =>
    (ACTIVE_QUEUE_STATUSES as readonly string[]).includes(q.status)
  );
  const waiting = active.filter((q) => q.status === QUEUE_STATUS.WAITING).length;
  const serving = active.filter((q) => q.status === QUEUE_STATUS.SERVING).length;
  const totalWait = active.reduce((s, e) => s + (e.service?.durationMin || 30), 0);

  return (
    <DesktopLayout title="Live Queue">
      <PageHeader>
        <Box>
          <PageTitle>
            {QUEUE_STRINGS.LIVE_TITLE} <Box component="span" sx={{ color: 'primary.main' }}>{QUEUE_STRINGS.LIVE_SPAN}</Box>
          </PageTitle>
          <PageSubtitle>
            <Box sx={styles.liveIndicator}>
              <Box
                component="span"
                sx={styles.liveDot}
              />
              Live · Last updated {lastUpdate.toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </Box>
          </PageSubtitle>
        </Box>
        <PageActions>
          {salons.length > 1 && (
            <Select size="small" value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)}>
              {salons.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          )}
          <Button onClick={() => callNext.mutate()} disabled={callNext.isPending || waiting === 0}>
            {callNext.isPending ? <CircularProgress size={16} sx={{ color: 'background.paper' }} /> : QUEUE_STRINGS.CALL_NEXT}
          </Button>
        </PageActions>
      </PageHeader>

      <Box sx={styles.statsGrid}>
        <Box sx={styles.statBox}>
          <Typography variant="h4" sx={{ ...styles.statNumber, color: 'warning.main' }}>
            {waiting}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {QUEUE_STRINGS.STAT_WAITING}
          </Typography>
        </Box>
        <Box sx={styles.statBox}>
          <Typography variant="h4" sx={{ ...styles.statNumber, color: 'success.main' }}>
            {serving}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {QUEUE_STRINGS.STAT_BEING_SERVED}
          </Typography>
        </Box>
        <Box sx={styles.statBox}>
          <Typography variant="h4" sx={styles.statNumber}>
            {totalWait}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {QUEUE_STRINGS.STAT_TOTAL_WAIT}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.queueList}>
        {active.length === 0 ? (
          <Box sx={styles.emptyState}>
            <Box sx={styles.emptyIcon}>{BRAND.ICON}</Box>
            {QUEUE_STRINGS.EMPTY}
          </Box>
        ) : (
          active.map((entry: QueueEntry) => {
            const borderColor = entry.status === QUEUE_STATUS.SERVING ? 'success.main' : entry.status === QUEUE_STATUS.CALLED ? 'info.main' : 'divider';
            const posBg = entry.status === QUEUE_STATUS.SERVING ? 'custom.successMuted' : entry.status === QUEUE_STATUS.CALLED ? 'custom.infoMuted' : 'custom.warningMuted';
            const posColor = entry.status === QUEUE_STATUS.SERVING ? 'success.main' : entry.status === QUEUE_STATUS.CALLED ? 'info.main' : 'warning.main';
            return (
              <Box key={entry.id} sx={{ ...styles.queueCard, borderLeftColor: borderColor }}>
                <Box sx={{ ...styles.posBox, bgcolor: posBg, color: posColor }}>
                  #{entry.position}
                </Box>

                <Box sx={styles.queueInfo}>
                  <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">
                    {entry.customer?.name || COMMON.CUSTOMER_FALLBACK}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.service?.name || 'Walk-in'}
                    {entry.staff && ` · with ${entry.staff.name}`}
                  </Typography>
                </Box>

                <Chip
                  label={entry.status.toLowerCase()}
                  color={queueStatusChipColor(entry.status)}
                  size="small"
                />

                <Box sx={styles.waitBox}>
                  <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.BOLD }} color="primary">
                    {entry.estimatedWaitMin || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'custom.textMuted' }}>
                    min wait
                  </Typography>
                </Box>

                <Box sx={styles.actionBox}>
                  {entry.status === QUEUE_STATUS.CALLED && (
                    <Button variant="contained" color="success" size="small" onClick={() => serve.mutate(entry.id)}>Serving ▶</Button>
                  )}
                  {entry.status === QUEUE_STATUS.SERVING && (
                    <Button variant="outlined" size="small" onClick={() => done.mutate(entry.id)}>Done ✓</Button>
                  )}
                  <Button variant="text" size="small" onClick={() => leave.mutate(entry.id)}>Remove</Button>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </DesktopLayout>
  );
}
