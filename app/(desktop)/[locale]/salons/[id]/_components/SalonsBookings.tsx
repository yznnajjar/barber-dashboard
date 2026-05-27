import { Box, Typography, Card, Chip, Button } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { SALON_DETAIL, COMMON } from '@/constants/text';
import { BOOKING_STATUS_BADGE, BOOKING_STATUS } from '@/constants/status';
import { styles } from './salon.styles';
import type { Booking } from '@/types';

interface Props {
  bookings: Booking[];
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

import { badgeChipColor } from '@/constants/chip-colors';

export default function SalonsBookings({ bookings, onComplete, onCancel }: Props) {
  if (bookings.length === 0) {
    return <Box sx={styles.bookingsEmpty}>{COMMON.NO_BOOKINGS}</Box>;
  }

  return (
    <Box>
      {bookings.map((b) => (
        <Card key={b.id} sx={styles.bookingsCard}>
          <Box sx={{ flex: 1.5 }}>
            <Typography sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">
              {b.customer?.name || COMMON.CUSTOMER_FALLBACK}
            </Typography>
            <Typography variant="body2" sx={{ color: 'custom.textMuted' }}>
              {b.customer?.phone || '—'}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: FONT_WEIGHT.MEDIUM }} color="text.primary">
              {b.service?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'custom.textMuted' }}>
              {b.staff?.name || COMMON.ANY_STAFF}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: FONT_WEIGHT.MEDIUM }} color="text.primary">
              {new Date(b.startTime).toLocaleDateString(COMMON.LOCALE, { month: 'short', day: 'numeric' })}
            </Typography>
            <Typography variant="body2" sx={{ color: 'custom.textMuted' }}>
              {new Date(b.startTime).toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
          <Chip
            label={b.status.toLowerCase()}
            color={badgeChipColor(BOOKING_STATUS_BADGE[b.status] || 'default')}
            size="small"
          />
          <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="primary">
            {b.totalPrice} {COMMON.CURRENCY}
          </Typography>
          {(b.status === BOOKING_STATUS.PENDING || b.status === BOOKING_STATUS.CONFIRMED) && (
            <Button variant="text" size="small" onClick={() => onCancel(b.id)}>{SALON_DETAIL.CANCEL}</Button>
          )}
          {b.status === BOOKING_STATUS.CONFIRMED && (
            <Button variant="contained" color="success" size="small" onClick={() => onComplete(b.id)}>{SALON_DETAIL.COMPLETE}</Button>
          )}
        </Card>
      ))}
    </Box>
  );
}
