'use client';

import { useState, useEffect } from 'react';
import { MobileLayout } from '../_layouts';
import { Box, Card, Chip, Skeleton, Typography } from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { useSalons, useSalonDetail, useQueue } from '@/features/salons/salons.queries';
import { useBookings } from '@/features/bookings/bookings.queries';
import { useAuthStore } from '@/features/auth/auth.store';
import { ACTIVE_QUEUE_STATUSES, BOOKING_STATUS } from '@/constants/status';
import { GREETINGS, COMMON } from '@/constants/text';
import type { Booking, QueueEntry } from '@/types';
import * as styles from './page.styles';

export default function MobileDashboardPage() {
  const { user } = useAuthStore();
  const { data: salonsData } = useSalons();
  const salons = salonsData?.data || [];
  const [selectedSalon, setSelectedSalon] = useState('');

  useEffect(() => {
    if (salons.length > 0 && !selectedSalon) setSelectedSalon(salons[0].id);
  }, [salons, selectedSalon]);

  const resolvedId = selectedSalon || salons[0]?.id || '';
  const { data: salon } = useSalonDetail(resolvedId || undefined);
  const { data: bookingsData, isLoading } = useBookings({ salonId: resolvedId, limit: 10 });
  const { data: queue } = useQueue(resolvedId || undefined);
  const bookings = bookingsData?.data || [];
  const queueEntries = queue || [];

  const todayBookings = bookings.filter((b: Booking) => {
    const today = new Date();
    return new Date(b.startTime).toDateString() === today.toDateString();
  }).length;

  const totalRevenue = bookings
    .filter((b: Booking) => b.status === BOOKING_STATUS.COMPLETED)
    .reduce((sum: number, b: Booking) => sum + b.totalPrice, 0)
    .toFixed(1);

  const queueCount = queueEntries.filter((q: QueueEntry) =>
    (ACTIVE_QUEUE_STATUSES as readonly string[]).includes(q.status)
  ).length;

  const avgRating = salon?.rating?.toFixed(1) || '0.0';

  const recent = [...bookings]
    .sort((a, b) => new Date(b.createdAt || b.startTime).getTime() - new Date(a.createdAt || a.startTime).getTime())
    .slice(0, 5);

  const now = new Date();
  const greeting = now.getHours() < 12 ? GREETINGS.MORNING : now.getHours() < 17 ? GREETINGS.AFTERNOON : GREETINGS.EVENING;

  return (
    <MobileLayout title="Home">
      <Typography
        sx={styles.greeting}
      >
        {greeting}, <Box component="span" sx={{ color: 'primary.main' }}>{user?.name?.split(' ')[0] || 'there'}</Box>
      </Typography>

      <Box sx={styles.statsGrid}>
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main', lineHeight: 1 }}>
            {todayBookings}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Today
          </Typography>
        </Card>
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main', lineHeight: 1 }}>
            {totalRevenue}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Revenue (JOD)
          </Typography>
        </Card>
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main', lineHeight: 1 }}>
            {queueCount}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            In Queue
          </Typography>
        </Card>
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main', lineHeight: 1 }}>
            {avgRating}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Rating
          </Typography>
        </Card>
      </Box>

      <Typography sx={styles.sectionTitle}>
        Recent Activity
      </Typography>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} sx={styles.activityCard}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" height={14} sx={{ mb: 1.5 }} />
              <Skeleton variant="text" height={12} width="60%" />
            </Box>
          </Card>
        ))
      ) : recent.length === 0 ? (
        <Typography sx={styles.emptyState}>
          {COMMON.NO_BOOKINGS}
        </Typography>
      ) : (
        recent.map((b: Booking) => (
          <Card key={b.id} sx={styles.activityCard}>
            <Box sx={styles.avatar}>
              {(b.customer?.name || '?')[0].toUpperCase()}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: FONT_WEIGHT.MEDIUM, color: 'text.primary' }}>
                {b.customer?.name || COMMON.CUSTOMER_FALLBACK}
              </Typography>
              <Typography sx={{ fontSize: FONT_SIZE.SM, color: 'custom.textMuted' }}>
                {b.service?.name} · {new Date(b.startTime).toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
            <Chip
              label={b.status.toLowerCase()}
              color={b.status === BOOKING_STATUS.CONFIRMED ? 'success' : b.status === BOOKING_STATUS.PENDING ? 'warning' : 'default'}
              size="small"
            />
          </Card>
        ))
      )}
    </MobileLayout>
  );
}
