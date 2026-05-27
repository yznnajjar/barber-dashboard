'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box, Typography, Chip, Skeleton, Select, MenuItem, Button, TextField,
} from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { DesktopLayout, PageHeader, PageTitle, PageSubtitle } from '../_layouts';
import { styles } from './_components/bookings.styles';
import { useSalons } from '@/features/salons/salons.queries';
import { useBookings, useBookingMutations } from '@/features/bookings/bookings.queries';
import { BOOKING_STATUS_BADGE, BOOKING_STATUSES, BOOKING_STATUS } from '@/constants/status';
import { BOOKINGS_STRINGS, COMMON } from '@/constants/text';
import { ROUTES } from '@/constants';
import type { Booking } from '@/types';

import { badgeChipColor } from '@/constants/chip-colors';

export default function BookingsPage() {
  const { data: salonsData } = useSalons();
  const salons = salonsData?.data || [];
  const [selectedSalon, setSelectedSalon] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (salons.length > 0 && !selectedSalon) setSelectedSalon(salons[0].id);
  }, [salons, selectedSalon]);

  const { data: bookingsData, isLoading } = useBookings({
    salonId: selectedSalon,
    status: statusFilter,
    limit: 100,
  });
  const bookings = bookingsData?.data || [];
  const { complete, cancel } = useBookingMutations();

  const filtered = bookings.filter((b: Booking) =>
    search === '' ||
    b.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.service?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DesktopLayout title="Bookings">
      <PageHeader>
        <Box>
          <PageTitle>Bookings</PageTitle>
          <PageSubtitle>{filtered.length} bookings</PageSubtitle>
        </Box>
        {salons.length > 1 && (
          <Select size="small" value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)}>
            {salons.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
          </Select>
        )}
      </PageHeader>

      <Box sx={styles.filterRow}>
        <TextField
          placeholder={BOOKINGS_STRINGS.SEARCH_PLACEHOLDER}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 280 }}
        />
        {BOOKING_STATUSES.map((s) => (
          <Button
            key={s}
            variant={statusFilter === s ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setStatusFilter(s)}
          >
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase().replace('_', ' ')}
          </Button>
        ))}
      </Box>

      <Box sx={styles.colHeader}>
        <Box sx={{ flex: 1.5 }}>Customer</Box>
        <Box sx={{ flex: 1 }}>Service</Box>
        <Box sx={{ flex: 1 }}>Date &amp; Time</Box>
        <Box sx={{ flex: 1 }}>Status</Box>
        <Box sx={{ flex: 1 }}>Price</Box>
        <Box sx={{ flex: 0.6, textAlign: 'right' }}>Actions</Box>
      </Box>

      <Box>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} sx={styles.skeletonCard}>
<Box sx={{ flex: 1.5 }}><Skeleton variant="text" height={14} sx={{ mb: 1.5 }} /><Skeleton variant="text" height={12} width="60%" /></Box>
              <Box sx={{ flex: 1 }}><Skeleton variant="text" height={14} /></Box>
              <Box sx={{ flex: 1 }}><Skeleton variant="text" height={14} /></Box>
              <Box sx={{ flex: 1 }}><Skeleton variant="rounded" height={22} width={80} /></Box>
              <Box sx={{ flex: 1 }}><Skeleton variant="text" height={14} width={50} /></Box>
              <Box sx={{ flex: 0.6, textAlign: 'right' }}><Skeleton variant="rounded" height={30} width={60} /></Box>
            </Box>
          ))
        ) : filtered.length === 0 ? (
          <Box sx={styles.emptyState}>
            {BOOKINGS_STRINGS.NO_RESULTS}
          </Box>
        ) : (
          filtered.map((b: Booking) => (
            <Box key={b.id} sx={styles.bookingCard}>
              <Box sx={{ flex: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.MEDIUM }} color="text.primary">
                  {b.customer?.name || COMMON.CUSTOMER_FALLBACK}
                </Typography>
                <Typography variant="caption" sx={{ color: 'custom.textMuted' }}>
                  {b.customer?.phone || '—'}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.MEDIUM }} color="text.primary">
                  {b.service?.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'custom.textMuted' }}>
                  {b.staff?.name || COMMON.ANY_STAFF}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.MEDIUM }} color="text.primary">
                  {new Date(b.startTime).toLocaleDateString(COMMON.LOCALE, { month: 'short', day: 'numeric' })}
                </Typography>
                <Typography variant="caption" sx={{ color: 'custom.textMuted' }}>
                  {new Date(b.startTime).toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit' })}
                  {' – '}
                  {new Date(b.endTime).toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Chip
                  label={b.status.toLowerCase()}
                  color={badgeChipColor(BOOKING_STATUS_BADGE[b.status] || 'default')}
                  size="small"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="primary">
                  {b.totalPrice} {COMMON.CURRENCY}
                </Typography>
              </Box>
              <Box sx={{ flex: 0.6, textAlign: 'right' }}>
                <Box sx={styles.actionBox}>
                  {b.status === BOOKING_STATUS.CONFIRMED && (
                    <Button variant="contained" color="success" size="small" onClick={() => complete.mutate(b.id)}>✓</Button>
                  )}
                  {(b.status === BOOKING_STATUS.PENDING || b.status === BOOKING_STATUS.CONFIRMED) && (
                    <Button variant="contained" color="error" size="small" onClick={() => cancel.mutate(b.id)}>✕</Button>
                  )}
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </DesktopLayout>
  );
}
