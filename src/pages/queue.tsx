import { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../lib/api';
import { theme } from '../lib/theme';
import Layout, { PageHeader, PageTitle, PageSubtitle, PageActions } from '../components/Layout';
import { Badge, Button, Spinner, EmptyState } from '../components/ui';
import type { QueueEntry, Salon } from '../lib/types';
import {
  LiveDot, LiveIndicator, SalonSelect, StatsRow, StatBox, StatNum, StatLabel,
  QueueList, QueueCard, PositionBadge, CustomerInfo, CustomerName, CustomerDetails,
  WaitTime, ActionBtns, EmptyIcon,
} from './queue.styles';

export default function QueuePage() {
  const [salons, setSalons]               = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState('');
  const [queue, setQueue]                 = useState<QueueEntry[]>([]);
  const [loading, setLoading]             = useState(false);
  const [lastUpdate, setLastUpdate]       = useState(new Date());

  useEffect(() => { fetchSalons(); }, []);

  useEffect(() => {
    if (!selectedSalon) return;
    fetchQueue();
    const interval = setInterval(() => {
      fetchQueue();
      setLastUpdate(new Date());
    }, 8000);
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
      setQueue(data || []);
    } catch {}
  };

  const callNext = async () => {
    setLoading(true);
    try {
      await api.post(`/queue/call-next/${selectedSalon}`, {});
      await fetchQueue();
    } catch {}
    setLoading(false);
  };

  const serve = async (id: string) => {
    await api.post(`/queue/serve/${id}`);
    await fetchQueue();
  };

  const done = async (id: string) => {
    await api.post(`/queue/done/${id}`);
    await fetchQueue();
  };

  const removeFromQueue = async (id: string) => {
    await api.delete(`/queue/leave/${id}`);
    await fetchQueue();
  };

  const active   = queue.filter((q) => ['WAITING', 'CALLED', 'SERVING'].includes(q.status));
  const waiting  = active.filter((q) => q.status === 'WAITING').length;
  const serving  = active.filter((q) => q.status === 'SERVING').length;
  const totalWait = active.reduce((s, e) => s + (e.service?.durationMin || 30), 0);

  return (
    <Layout title="Live Queue">
      <Head><title>Live Queue — Barber</title></Head>

      <PageHeader>
        <div>
          <PageTitle>Live <span>Queue</span></PageTitle>
          <PageSubtitle>
            <LiveIndicator>
              <LiveDot />
              Live · Last updated {lastUpdate.toLocaleTimeString('en-JO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </LiveIndicator>
          </PageSubtitle>
        </div>
        <PageActions>
          {salons.length > 1 && (
            <SalonSelect value={selectedSalon} onChange={(e) => setSelectedSalon(e.target.value)}>
              {salons.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </SalonSelect>
          )}
          <Button onClick={callNext} disabled={loading || waiting === 0}>
            {loading ? <Spinner size={16} color={theme.colors.textInverse} /> : '📣 Call Next'}
          </Button>
        </PageActions>
      </PageHeader>

      <StatsRow>
        <StatBox>
          <StatNum color={theme.colors.warning}>{waiting}</StatNum>
          <StatLabel>Waiting</StatLabel>
        </StatBox>
        <StatBox>
          <StatNum color={theme.colors.success}>{serving}</StatNum>
          <StatLabel>Being Served</StatLabel>
        </StatBox>
        <StatBox>
          <StatNum>{totalWait}</StatNum>
          <StatLabel>Total Wait (min)</StatLabel>
        </StatBox>
      </StatsRow>

      <QueueList>
        {active.length === 0 ? (
          <EmptyState>
            <EmptyIcon>✂</EmptyIcon>
            Queue is empty right now
          </EmptyState>
        ) : (
          active.map((entry) => (
            <QueueCard key={entry.id} status={entry.status}>
              <PositionBadge status={entry.status}>#{entry.position}</PositionBadge>

              <CustomerInfo>
                <CustomerName>{entry.customer?.name || 'Customer'}</CustomerName>
                <CustomerDetails>
                  {entry.service?.name || 'Walk-in'}
                  {entry.staff && ` · with ${entry.staff.name}`}
                </CustomerDetails>
              </CustomerInfo>

              <Badge
                variant={
                  entry.status === 'SERVING' ? 'success' :
                  entry.status === 'CALLED'  ? 'info' : 'warning'
                }
                dot
              >
                {entry.status.toLowerCase()}
              </Badge>

              <WaitTime>
                <p>{entry.estimatedWaitMin || 0}</p>
                <p>min wait</p>
              </WaitTime>

              <ActionBtns>
                {entry.status === 'WAITING' && (
                  <Button size="sm" onClick={() => callNext()}>Call</Button>
                )}
                {entry.status === 'CALLED' && (
                  <Button variant="success" size="sm" onClick={() => serve(entry.id)}>Serving ▶</Button>
                )}
                {entry.status === 'SERVING' && (
                  <Button variant="secondary" size="sm" onClick={() => done(entry.id)}>Done ✓</Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => removeFromQueue(entry.id)}>Remove</Button>
              </ActionBtns>
            </QueueCard>
          ))
        )}
      </QueueList>
    </Layout>
  );
}
