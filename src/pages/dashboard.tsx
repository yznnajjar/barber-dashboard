import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuthStore } from '../lib/authStore';
import api from '../lib/api';
import Layout, { PageHeader, PageTitle, PageSubtitle, PageActions } from '../components/Layout';
import {
  CardHeader, CardTitle, Button, Badge, Skeleton, Avatar,
  StatValue, StatLabel, StatTrend, IconBox, EmptyState, Spinner,
} from '../components/ui';
import { theme } from '../lib/theme';
import type { Booking, QueueEntry, Salon } from '../lib/types';
import {
  StatsGrid, StatCard, StatContent, ContentGrid,
  BookingsCard, BookingsCardHeader, Table, TableRow, TableCell,
  BookingName, BookingMeta, BookingPrice,
  QueueCard, QueueCardHeader, QueueBody, QueueItem, QueuePosition, QueueInfo,
  SalonSelector, SkeletonRow,
} from './dashboard.styles';

function statusBadge(status: string) {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    CONFIRMED: 'success',
    PENDING:   'warning',
    COMPLETED: 'info',
    CANCELLED: 'error',
    NO_SHOW:   'default',
  };
  return map[status] || 'default';
}

function queueStatusBadge(status: string) {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    WAITING: 'warning',
    CALLED:  'info',
    SERVING: 'success',
  };
  return (map[status] as any) || 'default';
}

const STATS = [
  { key: 'todayBookings', label: "Today's Bookings",    icon: '◷', color: theme.colors.infoMuted },
  { key: 'totalRevenue',  label: 'Total Revenue (JOD)', icon: '◈', color: theme.colors.primaryMuted },
  { key: 'queueLength',   label: 'In Queue Now',        icon: '⋮⋮', color: theme.colors.warningMuted },
  { key: 'avgRating',     label: 'Avg Rating',          icon: '★', color: theme.colors.successMuted },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [salons, setSalons]               = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<string>('');
  const [bookings, setBookings]           = useState<Booking[]>([]);
  const [queue, setQueue]                 = useState<QueueEntry[]>([]);
  const [loading, setLoading]             = useState(true);

  const stats = {
    todayBookings: bookings.filter((b) => {
      const today = new Date();
      return new Date(b.startTime).toDateString() === today.toDateString();
    }).length,
    totalRevenue: bookings
      .filter((b) => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + b.totalPrice, 0)
      .toFixed(1),
    queueLength: queue.filter((q) => ['WAITING', 'CALLED', 'SERVING'].includes(q.status)).length,
    avgRating: salons.find((s) => s.id === selectedSalon)?.rating?.toFixed(1) || '0.0',
  };

  useEffect(() => { fetchSalons(); }, []);
  useEffect(() => { if (selectedSalon) fetchData(); }, [selectedSalon]);

  useEffect(() => {
    if (!selectedSalon) return;
    const interval = setInterval(fetchQueue, 15000);
    return () => clearInterval(interval);
  }, [selectedSalon]);

  const fetchSalons = async () => {
    try {
      const { data } = await api.get('/salons?limit=50');
      setSalons(data.data || []);
      if (data.data?.length > 0) setSelectedSalon(data.data[0].id);
    } catch {}
  };

  const fetchQueue = async () => {
    try {
      const { data } = await api.get(`/salons/${selectedSalon}/queue`);
      setQueue(data);
    } catch {}
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, queueRes] = await Promise.all([
        api.get(`/bookings?salonId=${selectedSalon}&limit=50`),
        api.get(`/salons/${selectedSalon}/queue`),
      ]);
      setBookings(bookingsRes.data.data || []);
      setQueue(queueRes.data || []);
    } catch {}
    setLoading(false);
  };

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt || b.startTime).getTime() - new Date(a.createdAt || a.startTime).getTime())
    .slice(0, 8);

  const activeQueue = queue.filter((q) => ['WAITING', 'CALLED', 'SERVING'].includes(q.status));

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout title="Dashboard">
      <Head><title>Dashboard — Barber</title></Head>

      <PageHeader>
        <div>
          <PageTitle>
            {greeting}, <span>{user?.name?.split(' ')[0] || 'there'}</span> 👋
          </PageTitle>
          <PageSubtitle>Here's what's happening at your salon today.</PageSubtitle>
        </div>
        <PageActions>
          {salons.length > 1 && (
            <SalonSelector value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)}>
              {salons.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </SalonSelector>
          )}
          <Link href={`/salons/${selectedSalon}`} passHref>
            <Button variant="secondary" size="sm" as="a">Manage Salon →</Button>
          </Link>
        </PageActions>
      </PageHeader>

      <StatsGrid>
        {STATS.map(({ key, label, icon, color }) => (
          <StatCard key={key}>
            <StatContent>
              <StatLabel>{label}</StatLabel>
              {loading
                ? <Skeleton height="36px" width="80px" style={{ marginTop: 4 }} />
                : <StatValue>{(stats as any)[key]}</StatValue>
              }
            </StatContent>
            <IconBox color={color}>{icon}</IconBox>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <BookingsCard>
          <BookingsCardHeader>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <Link href="/bookings" passHref>
                <Button variant="ghost" size="sm" as="a">View all →</Button>
              </Link>
            </CardHeader>
          </BookingsCardHeader>

          <Table>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell flex={2}>
                    <Skeleton height="14px" style={{ marginBottom: 6 }} />
                    <Skeleton height="12px" width="60%" />
                  </TableCell>
                  <TableCell><Skeleton height="22px" width="70px" /></TableCell>
                  <TableCell flex={0.6} align="right"><Skeleton height="14px" width="40px" /></TableCell>
                </TableRow>
              ))
            ) : recentBookings.length === 0 ? (
              <EmptyState>No bookings yet</EmptyState>
            ) : (
              recentBookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell flex={2}>
                    <BookingName>{b.customer?.name || 'Customer'}</BookingName>
                    <BookingMeta>
                      {b.service?.name} · {new Date(b.startTime).toLocaleDateString('en-JO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </BookingMeta>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadge(b.status)} dot>{b.status.toLowerCase()}</Badge>
                  </TableCell>
                  <TableCell flex={0.7} align="right">
                    <BookingPrice>{b.totalPrice} JOD</BookingPrice>
                  </TableCell>
                </TableRow>
              ))
            )}
          </Table>
        </BookingsCard>

        <QueueCard>
          <QueueCardHeader>
            <CardHeader>
              <CardTitle>
                Live Queue
                {activeQueue.length > 0 && (
                  <Badge variant="gold" style={{ marginLeft: theme.spacing['2'] }}>{activeQueue.length}</Badge>
                )}
              </CardTitle>
              <Link href="/queue" passHref>
                <Button variant="ghost" size="sm" as="a">Manage →</Button>
              </Link>
            </CardHeader>
          </QueueCardHeader>

          <QueueBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <QueueItem key={i}>
                  <Skeleton width="28px" height="28px" radius={theme.radius.sm} />
                  <SkeletonRow>
                    <Skeleton height="14px" style={{ marginBottom: 4 }} />
                    <Skeleton height="12px" width="60%" />
                  </SkeletonRow>
                  <Skeleton width="60px" height="22px" />
                </QueueItem>
              ))
            ) : activeQueue.length === 0 ? (
              <EmptyState style={{ padding: `${theme.spacing['10']} 0` }}>Queue is empty</EmptyState>
            ) : (
              activeQueue.map((entry) => (
                <QueueItem key={entry.id}>
                  <QueuePosition>#{entry.position}</QueuePosition>
                  <QueueInfo>
                    <p>{entry.customer?.name || 'Customer'}</p>
                    <p>{entry.service?.name || 'No service'} · ~{entry.estimatedWaitMin || 0} min</p>
                  </QueueInfo>
                  <Badge variant={queueStatusBadge(entry.status)} dot>
                    {entry.status.toLowerCase()}
                  </Badge>
                </QueueItem>
              ))
            )}
          </QueueBody>
        </QueueCard>
      </ContentGrid>
    </Layout>
  );
}
