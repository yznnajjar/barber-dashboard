'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box, Typography, Chip, CircularProgress, Button,
} from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import { DesktopLayout, PageHeader, PageTitle, PageSubtitle, PageActions } from '../../_layouts';
import { styles } from './_components/salon.styles';
import { useSalonDetail, useQueue } from '@/features/salons/salons.queries';
import { useBookings, useBookingMutations } from '@/features/bookings/bookings.queries';
import { useQueueMutations } from '@/features/queue/queue.queries';
import { SALON_DETAIL, DAY_NAMES, SALON_TABS, COMMON } from '@/constants/text';
import { BOOKING_STATUS_BADGE, QUEUE_STATUS_BADGE, ACTIVE_QUEUE_STATUSES } from '@/constants/status';
import SalonsOverview from './_components/SalonsOverview';
import SalonsServices from './_components/SalonsServices';
import SalonsStaff from './_components/SalonsStaff';
import SalonsBookings from './_components/SalonsBookings';
import SalonsQueue from './_components/SalonsQueue';

export default function SalonDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [tab, setTab] = useState(0);

  const { data: salon, isLoading } = useSalonDetail(id);
  const { data: queue } = useQueue(id);
  const queueEntries = queue || [];
  const { data: bookingsData } = useBookings({ salonId: id!, limit: 50 });
  const bookings = bookingsData?.data || [];
  const { complete, cancel } = useBookingMutations();
  const { callNext, serve, done } = useQueueMutations(id || '');

  if (isLoading) {
    return (
      <DesktopLayout title="Salon">
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={32} />
        </Box>
      </DesktopLayout>
    );
  }

  if (!salon) {
    return (
      <DesktopLayout title="Salon">
        <Box sx={styles.notFound}>
          {SALON_DETAIL.NOT_FOUND}
        </Box>
      </DesktopLayout>
    );
  }

  const activeQueue = queueEntries.filter((q) =>
    (ACTIVE_QUEUE_STATUSES as readonly string[]).includes(q.status)
  );

  return (
    <DesktopLayout title={salon.name}>
      <PageHeader>
        <Box>
          <PageTitle>{salon.name}</PageTitle>
          <PageSubtitle>
            {salon.address} · {salon.openTime}–{salon.closeTime}
            {' · '}
            <Box component="span" sx={{ color: 'primary.main' }}>★ {salon.rating}</Box>
            {' '}({salon.totalReviews} reviews)
          </PageSubtitle>
        </Box>
        <PageActions>
          <Chip
            label={salon.isApproved ? SALON_DETAIL.APPROVED : SALON_DETAIL.PENDING}
            color={salon.isApproved ? 'success' : 'warning'}
            size="small"
          />
          <Chip
            label={salon.isActive ? SALON_DETAIL.ACTIVE : SALON_DETAIL.INACTIVE}
            color={salon.isActive ? 'success' : 'error'}
            size="small"
          />
        </PageActions>
      </PageHeader>

      <Box sx={styles.tabBar}>
        {SALON_TABS.map((t, i) => (
          <Button
            key={t}
            onClick={() => setTab(i)}
            sx={{
              ...styles.tabButton,
              color: tab === i ? 'primary.main' : 'text.secondary',
              borderColor: tab === i ? 'primary.main' : 'transparent',
            }}
          >
            {t === 'Live Queue' && activeQueue.length > 0 ? `Queue (${activeQueue.length})` : t}
          </Button>
        ))}
      </Box>

      {tab === 0 && <SalonsOverview salon={salon} />}
      {tab === 1 && <SalonsServices services={salon.services || []} />}
      {tab === 2 && <SalonsStaff staff={salon.staff || []} />}
      {tab === 3 && (
        <SalonsBookings
          bookings={bookings}
          onComplete={(bId) => complete.mutate(bId)}
          onCancel={(bId) => cancel.mutate(bId)}
        />
      )}
      {tab === 4 && (
        <SalonsQueue
          entries={activeQueue}
          callNextPending={callNext.isPending}
          onCallNext={() => callNext.mutate()}
          onServe={(eId) => serve.mutate(eId)}
          onDone={(eId) => done.mutate(eId)}
        />
      )}
    </DesktopLayout>
  );
}
