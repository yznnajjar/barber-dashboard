'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box, Typography, Card, CardHeader, Chip, Skeleton,
  Paper, Select, MenuItem, Button,
} from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { DesktopLayout, PageHeader, PageTitle, PageSubtitle, PageActions } from '../_layouts';
import { styles } from './_components/dashboard.styles';
import { useSalons, useSalonDetail, useQueue } from '@/features/salons/salons.queries';
import { useBookings } from '@/features/bookings/bookings.queries';
import { useAuthStore } from '@/features/auth/auth.store';
import { ACTIVE_QUEUE_STATUSES, BOOKING_STATUS, BOOKING_STATUS_BADGE } from '@/constants/status';
import { DASHBOARD, GREETINGS, COMMON } from '@/constants/text';
import { ROUTES } from '@/constants';
import { badgeChipColor, queueStatusChipColor } from '@/constants/chip-colors';
import type { Booking, QueueEntry } from '@/types';

const STATS = [
  { key: 'todayBookings', label: "Today's Bookings", icon: '◷', color: 'custom.infoMuted' },
  { key: 'totalRevenue', label: 'Total Revenue (JOD)', icon: '◈', color: 'custom.primaryMuted' },
  { key: 'queueLength', label: 'In Queue Now', icon: '⋮⋮', color: 'custom.warningMuted' },
  { key: 'avgRating', label: 'Avg Rating', icon: '★', color: 'custom.successMuted' },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: salonsData } = useSalons();
  const salons = salonsData?.data || [];
  const [selectedSalon, setSelectedSalon] = useState('');
  const resolvedId = selectedSalon || salons[0]?.id || '';
  const { data: salon } = useSalonDetail(resolvedId || undefined);
  const { data: bookingsData, isLoading } = useBookings({ salonId: resolvedId, limit: 50 });
  const { data: queue } = useQueue(resolvedId || undefined);
  const bookings = bookingsData?.data || [];
  const queueEntries = queue || [];

  useEffect(() => {
    if (salons.length > 0 && !selectedSalon) setSelectedSalon(salons[0].id);
  }, [salons, selectedSalon]);

  const stats = {
    todayBookings: bookings.filter((b: Booking) => {
      const today = new Date();
      return new Date(b.startTime).toDateString() === today.toDateString();
    }).length,
    totalRevenue: bookings
      .filter((b: Booking) => b.status === BOOKING_STATUS.COMPLETED)
      .reduce((sum: number, b: Booking) => sum + b.totalPrice, 0)
      .toFixed(1),
    queueLength: queueEntries.filter((q: QueueEntry) =>
      (ACTIVE_QUEUE_STATUSES as readonly string[]).includes(q.status)
    ).length,
    avgRating: salon?.rating?.toFixed(1) || '0.0',
  };

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt || b.startTime).getTime() - new Date(a.createdAt || a.startTime).getTime())
    .slice(0, 8);

  const activeQueue = queueEntries.filter((q: QueueEntry) =>
    (ACTIVE_QUEUE_STATUSES as readonly string[]).includes(q.status)
  );

  const now = new Date();
  const greeting = now.getHours() < 12 ? GREETINGS.MORNING : now.getHours() < 17 ? GREETINGS.AFTERNOON : GREETINGS.EVENING;

  return (
    <DesktopLayout title="Dashboard">
      <PageHeader>
        <Box>
          <PageTitle>
            {greeting}, <Box component="span" sx={{ color: 'primary.main' }}>{user?.name?.split(' ')[0] || 'there'}</Box>
          </PageTitle>
          <PageSubtitle>{DASHBOARD.SUBTITLE}</PageSubtitle>
        </Box>
        <PageActions>
          {salons.length > 1 && (
            <Select
              size="small"
              value={selectedSalon}
              onChange={(e) => setSelectedSalon(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              {salons.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          )}
          <Link href={ROUTES.DESKTOP().SALON_DETAIL(resolvedId)} passHref legacyBehavior>
            <Button variant="outlined" size="small">{DASHBOARD.MANAGE_SALON}</Button>
          </Link>
        </PageActions>
      </PageHeader>

      <Box sx={styles.statsGrid}>
        {STATS.map(({ key, label, icon, color }) => (
          <Paper key={key} sx={styles.statCard}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {label}
              </Typography>
              {isLoading ? (
                <Skeleton variant="rounded" height={36} width={80} sx={{ mt: 0.5 }} />
              ) : (
                <Typography
                  variant="h4"
                  sx={styles.statValue}
                >
                  {(stats as Record<string, unknown>)[key] as string}
                </Typography>
              )}
            </Box>
            <Box sx={{
              width: 44, height: 44, borderRadius: 1.25,
              bgcolor: color, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: FONT_SIZE.XL, flexShrink: 0,
            }}>
              {icon}
            </Box>
          </Paper>
        ))}
      </Box>

      <Box sx={styles.chartGrid}>
        <Card>
          <CardHeader
            sx={{ pb: 0 }}
            title={<Typography variant="h6">{DASHBOARD.RECENT_BOOKINGS}</Typography>}
            action={
              <Link href={ROUTES.DESKTOP().BOOKINGS} passHref legacyBehavior>
                <Button variant="text" size="small">{DASHBOARD.VIEW_ALL}</Button>
              </Link>
            }
          />

          <Box>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} sx={styles.skeletonBookingRow}>
                  <Box sx={{ flex: 2 }}>
                    <Skeleton variant="text" height={14} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" height={12} width="60%" />
                  </Box>
                  <Box sx={{ flex: 1 }}><Skeleton variant="rounded" height={22} width={70} /></Box>
                  <Box sx={{ flex: 0.6, textAlign: 'right' }}><Skeleton variant="text" height={14} width={40} /></Box>
                </Box>
              ))
            ) : recentBookings.length === 0 ? (
              <Box sx={styles.bookingEmptyState}>
                {COMMON.NO_BOOKINGS}
              </Box>
            ) : (
              recentBookings.map((b: Booking) => (
                <Box key={b.id} sx={styles.bookingRow}>
                  <Box sx={{ flex: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">
                      {b.customer?.name || COMMON.CUSTOMER_FALLBACK}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'custom.textMuted' }}>
                      {b.service?.name} · {new Date(b.startTime).toLocaleDateString(COMMON.LOCALE, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Chip
                      label={b.status.toLowerCase()}
                      color={badgeChipColor(BOOKING_STATUS_BADGE[b.status] || 'default')}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ flex: 0.7, textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="primary">
                      {b.totalPrice} {COMMON.CURRENCY}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Card>

        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            sx={{ pb: 0 }}
            title={
              <Box sx={styles.queueHeader}>
                <Typography variant="h6">{DASHBOARD.LIVE_QUEUE}</Typography>
                {activeQueue.length > 0 && (
                  <Chip label={activeQueue.length} color="primary" size="small" />
                )}
              </Box>
            }
            action={
              <Link href={ROUTES.DESKTOP().QUEUE} passHref legacyBehavior>
                <Button variant="text" size="small">{DASHBOARD.MANAGE}</Button>
              </Link>
            }
          />

          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} sx={styles.queueSkeletonRow}>
                  <Skeleton variant="circular" width={28} height={28} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" height={14} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={12} width="60%" />
                  </Box>
                  <Skeleton variant="rounded" width={60} height={22} />
                </Box>
              ))
            ) : activeQueue.length === 0 ? (
              <Box sx={styles.queueEmptyState}>
                {COMMON.QUEUE_EMPTY}
              </Box>
            ) : (
              activeQueue.map((entry: QueueEntry) => (
                <Box key={entry.id} sx={styles.queueRow}>
                  <Box sx={styles.queuePosition}>
                    #{entry.position}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.MEDIUM }} color="text.primary">
                      {entry.customer?.name || COMMON.CUSTOMER_FALLBACK}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'custom.textMuted' }}>
                      {entry.service?.name || 'No service'} · ~{entry.estimatedWaitMin || 0} min
                    </Typography>
                  </Box>
                  <Chip
                    label={entry.status.toLowerCase()}
                    color={queueStatusChipColor(entry.status)}
                    size="small"
                  />
                </Box>
              ))
            )}
          </Box>
        </Card>
      </Box>
    </DesktopLayout>
  );
}
