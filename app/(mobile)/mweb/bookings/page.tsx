'use client';

import { useState, useEffect } from 'react';
import { MobileLayout } from '../_layouts';
import { Box, Button, Card, Chip, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { useSalons } from '@/features/salons/salons.queries';
import { useBookings, useBookingMutations } from '@/features/bookings/bookings.queries';
import { BOOKING_STATUS_BADGE, BOOKING_STATUSES, BOOKING_STATUS } from '@/constants/status';
import { BOOKINGS_STRINGS, COMMON } from '@/constants/text';
import type { Booking } from '@/types';
import * as styles from './page.styles';

export default function MobileBookingsPage() {
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
    limit: 50,
  });
  const bookings = bookingsData?.data || [];
  const { complete, cancel } = useBookingMutations();

  const filtered = bookings.filter((b: Booking) =>
    search === '' ||
    b.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.service?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileLayout title="Bookings" subtitle={`${filtered.length} bookings`}>
      {salons.length > 1 && (
        <Select value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)} sx={{ mb: 1, bgcolor: 'background.paper' }}>
          {salons.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
        </Select>
      )}

      <TextField
        placeholder={BOOKINGS_STRINGS.SEARCH_PLACEHOLDER}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 1.5 }}
      />

      <Box sx={styles.filterRow}>
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

      <Box sx={styles.bookingsList}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} sx={{ p: 2 }}>
              <Skeleton variant="text" height={16} width="60%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={14} width="40%" sx={{ mb: 3 }} />
              <Skeleton variant="text" height={14} width="80%" />
            </Card>
          ))
        ) : filtered.length === 0 ? (
          <Box sx={styles.emptyState}>
            {BOOKINGS_STRINGS.NO_RESULTS}
          </Box>
        ) : (
          filtered.map((b: Booking) => (
            <Card key={b.id} sx={{ p: 2 }}>
              <Box sx={styles.cardHeader}>
                <Box>
                  <Typography sx={styles.customerName}>
                    {b.customer?.name || COMMON.CUSTOMER_FALLBACK}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {b.service?.name}{b.staff && ` · ${b.staff.name}`}
                  </Typography>
                </Box>
                <Chip
                  label={b.status.toLowerCase()}
                  color={(BOOKING_STATUS_BADGE[b.status] || 'default') as any}
                  size="small"
                />
              </Box>
              <Typography variant="body2" sx={{ color: 'custom.textMuted' }}>
                {new Date(b.startTime).toLocaleDateString(COMMON.LOCALE, { month: 'short', day: 'numeric' })}
                {' '}
                {new Date(b.startTime).toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit' })}
                {' – '}
                {new Date(b.endTime).toLocaleTimeString(COMMON.LOCALE, { hour: '2-digit', minute: '2-digit' })}
              </Typography>
              <Box sx={styles.priceRow}>
                <Typography component="span" sx={styles.priceText}>
                  {b.totalPrice} {COMMON.CURRENCY}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {b.status === BOOKING_STATUS.CONFIRMED && (
                    <Button variant="contained" color="success" size="small" onClick={() => complete.mutate(b.id)} sx={{ minHeight: 44 }}>✓</Button>
                  )}
                  {(b.status === BOOKING_STATUS.PENDING || b.status === BOOKING_STATUS.CONFIRMED) && (
                    <Button variant="contained" color="error" size="small" onClick={() => cancel.mutate(b.id)} sx={{ minHeight: 44 }}>✕</Button>
                  )}
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </MobileLayout>
  );
}
