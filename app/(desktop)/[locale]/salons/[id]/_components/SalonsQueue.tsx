import { Box, Typography, Chip, CircularProgress, Button } from '@mui/material';
import { QUEUE_STATUS } from '@/constants/status';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { SALON_DETAIL, COMMON } from '@/constants/text';
import { styles } from './salon.styles';
import type { QueueEntry } from '@/types';

interface Props {
  entries: QueueEntry[];
  callNextPending: boolean;
  onCallNext: () => void;
  onServe: (id: string) => void;
  onDone: (id: string) => void;
}

export default function SalonsQueue({ entries, callNextPending, onCallNext, onServe, onDone }: Props) {
  return (
    <>
      <Box sx={styles.queueHeader}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">
            {entries.length} {entries.length === 1 ? 'person' : 'people'} in queue
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {SALON_DETAIL.AUTO_REFRESH}
          </Typography>
        </Box>
        <Button onClick={onCallNext} disabled={callNextPending}>
          {callNextPending ? <CircularProgress size={16} sx={{ color: 'background.paper' }} /> : SALON_DETAIL.CALL_NEXT}
        </Button>
      </Box>

      {entries.length === 0 ? (
        <Box sx={styles.queueEmpty}>{SALON_DETAIL.QUEUE_EMPTY}</Box>
      ) : (
        <Box sx={styles.queueList}>
          {entries.map((entry) => {
            const posBg = entry.status === QUEUE_STATUS.SERVING ? 'custom.successMuted' : entry.status === QUEUE_STATUS.CALLED ? 'custom.infoMuted' : 'custom.warningMuted';
            const posColor = entry.status === QUEUE_STATUS.SERVING ? 'success.main' : entry.status === QUEUE_STATUS.CALLED ? 'info.main' : 'warning.main';
            return (
              <Box key={entry.id} sx={styles.queueCard}>
                <Box sx={{ ...styles.queuePosBox, bgcolor: posBg, color: posColor }}>
                  #{entry.position}
                </Box>
                <Box sx={styles.queueInfo}>
                  <Typography sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">
                    {entry.customer?.name || COMMON.CUSTOMER_FALLBACK}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.service?.name || 'No service'}
                    {entry.staff && ` · ${entry.staff.name}`}
                    {' · ~'}{entry.estimatedWaitMin || 0} min wait
                  </Typography>
                </Box>
                <Chip
                  label={entry.status.toLowerCase()}
                  color={entry.status === QUEUE_STATUS.SERVING ? 'success' : entry.status === QUEUE_STATUS.CALLED ? 'info' : 'warning'}
                  size="small"
                />
                <Box sx={styles.queueActionBox}>
                  {entry.status === QUEUE_STATUS.CALLED && (
                    <Button variant="contained" color="success" size="small" onClick={() => onServe(entry.id)}>{SALON_DETAIL.SERVING}</Button>
                  )}
                  {entry.status === QUEUE_STATUS.SERVING && (
                    <Button variant="outlined" size="small" onClick={() => onDone(entry.id)}>{SALON_DETAIL.DONE}</Button>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}
