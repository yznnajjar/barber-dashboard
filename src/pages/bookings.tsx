import { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../lib/api';
import Layout, { PageHeader, PageTitle, PageSubtitle, PageActions } from '../components/Layout';
import { Badge, Button, Skeleton, EmptyState } from '../components/ui';
import type { Booking, Salon } from '../lib/types';
import {
  FilterBar, FilterSelect, SearchInput, BookingsTable, BookingCard,
  ColHeader, CellPrimary, CellSecondary, Price, BookingActions,
} from './bookings.styles';

function statusBadge(status: string) {
  const map: Record<string, any> = {
    CONFIRMED: 'success', PENDING: 'warning',
    COMPLETED: 'info',    CANCELLED: 'error', NO_SHOW: 'default',
  };
  return map[status] || 'default';
}

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];

export default function BookingsPage() {
  const [salons, setSalons]               = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState('');
  const [bookings, setBookings]           = useState<Booking[]>([]);
  const [loading, setLoading]             = useState(true);
  const [statusFilter, setStatusFilter]   = useState('ALL');
  const [search, setSearch]               = useState('');

  useEffect(() => { fetchSalons(); }, []);
  useEffect(() => { if (selectedSalon) fetchBookings(); }, [selectedSalon, statusFilter]);

  const fetchSalons = async () => {
    try {
      const { data } = await api.get('/salons?limit=50');
      setSalons(data.data || []);
      if (data.data?.length > 0) setSelectedSalon(data.data[0].id);
    } catch {}
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ salonId: selectedSalon, limit: '100' });
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      const { data } = await api.get(`/bookings?${params}`);
      setBookings(data.data || []);
    } catch {}
    setLoading(false);
  };

  const handleComplete = async (id: string) => {
    await api.patch(`/bookings/${id}/complete`);
    fetchBookings();
  };

  const handleCancel = async (id: string) => {
    await api.patch(`/bookings/${id}/cancel`);
    fetchBookings();
  };

  const filtered = bookings.filter((b) =>
    search === '' ||
    b.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.service?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Bookings">
      <Head><title>Bookings — Barber</title></Head>

      <PageHeader>
        <div>
          <PageTitle>Bookings</PageTitle>
          <PageSubtitle>{filtered.length} bookings</PageSubtitle>
        </div>
        {salons.length > 1 && (
          <FilterSelect value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)}>
            {salons.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </FilterSelect>
        )}
      </PageHeader>

      <FilterBar>
        <SearchInput
          placeholder="Search customer or service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {STATUSES.map((s) => (
          <Button
            key={s}
            variant={statusFilter === s ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setStatusFilter(s)}
          >
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase().replace('_', ' ')}
          </Button>
        ))}
      </FilterBar>

      <ColHeader>
        <span>Customer</span>
        <span>Service</span>
        <span>Date &amp; Time</span>
        <span>Status</span>
        <span>Price</span>
        <span>Actions</span>
      </ColHeader>

      <BookingsTable>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <BookingCard key={i}>
              <div><Skeleton height="14px" style={{ marginBottom: 6 }} /><Skeleton height="12px" width="60%" /></div>
              <Skeleton height="14px" />
              <Skeleton height="14px" />
              <Skeleton height="22px" width="80px" />
              <Skeleton height="14px" width="50px" />
              <Skeleton height="30px" width="60px" />
            </BookingCard>
          ))
        ) : filtered.length === 0 ? (
          <EmptyState>No bookings found</EmptyState>
        ) : (
          filtered.map((b) => (
            <BookingCard key={b.id}>
              <div>
                <CellPrimary>{b.customer?.name || 'Customer'}</CellPrimary>
                <CellSecondary>{b.customer?.phone || '—'}</CellSecondary>
              </div>
              <div>
                <CellPrimary>{b.service?.name}</CellPrimary>
                <CellSecondary>{b.staff?.name || 'Any staff'}</CellSecondary>
              </div>
              <div>
                <CellPrimary>
                  {new Date(b.startTime).toLocaleDateString('en-JO', { month: 'short', day: 'numeric' })}
                </CellPrimary>
                <CellSecondary>
                  {new Date(b.startTime).toLocaleTimeString('en-JO', { hour: '2-digit', minute: '2-digit' })}
                  {' – '}
                  {new Date(b.endTime).toLocaleTimeString('en-JO', { hour: '2-digit', minute: '2-digit' })}
                </CellSecondary>
              </div>
              <Badge variant={statusBadge(b.status)} dot>{b.status.toLowerCase()}</Badge>
              <Price>{b.totalPrice} JOD</Price>
              <BookingActions>
                {b.status === 'CONFIRMED' && (
                  <Button variant="success" size="sm" onClick={() => handleComplete(b.id)}>✓</Button>
                )}
                {['PENDING', 'CONFIRMED'].includes(b.status) && (
                  <Button variant="danger" size="sm" onClick={() => handleCancel(b.id)}>✕</Button>
                )}
              </BookingActions>
            </BookingCard>
          ))
        )}
      </BookingsTable>
    </Layout>
  );
}
