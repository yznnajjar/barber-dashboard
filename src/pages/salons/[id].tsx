import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { theme } from '../../lib/theme';
import Layout, { PageHeader, PageTitle, PageSubtitle, PageActions } from '../../components/Layout';
import {
  Card, CardTitle, Button, Badge, Avatar,
  EmptyState, Spinner, Divider,
} from '../../components/ui';
import {
  TabList, TabBtn,
  InfoGrid, InfoRow, InfoLabel, InfoValue,
  ServiceGrid, ServiceCard, ServiceHeader, ServiceName, ServiceMeta, ServiceMetaItem, ServicePrice,
  StaffGrid, StaffCard, StaffName, StaffBio, ScheduleChips, DayChip,
  BookingsList, BookingRow, BookingCustomer, BookingDetail,
  QueueGrid, QueueCard, QueueNum, QueueCustomer, QueueActions,
} from './[id].styles';
import { useSalonDetail } from '../../hooks/useSalonDetail';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function statusBadge(status: string) {
  const map: Record<string, string> = {
    CONFIRMED: 'success', PENDING: 'warning',
    COMPLETED: 'info', CANCELLED: 'error', NO_SHOW: 'default',
  };
  return map[status] || 'default';
}

const TABS = ['Overview', 'Services', 'Staff', 'Bookings', 'Live Queue'];

export default function SalonDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState(0);

  const {
    salon, bookings, activeQueue,
    loading, queueLoading,
    callNext, serveEntry, doneEntry,
  } = useSalonDetail(id);

  if (loading) {
    return (
      <Layout title="Salon">
        <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing['20'] }}>
          <Spinner size={32} />
        </div>
      </Layout>
    );
  }

  if (!salon) {
    return (
      <Layout title="Salon">
        <EmptyState>Salon not found</EmptyState>
      </Layout>
    );
  }

  return (
    <Layout title={salon.name}>
      <Head><title>{salon.name} — Barber Dashboard</title></Head>

      <PageHeader>
        <div>
          <PageTitle>{salon.name}</PageTitle>
          <PageSubtitle>
            {salon.address} · {salon.openTime}–{salon.closeTime}
            {' · '}
            <span style={{ color: theme.colors.primary }}>★ {salon.rating}</span>
            {' '}({salon.totalReviews} reviews)
          </PageSubtitle>
        </div>
        <PageActions>
          <Badge variant={salon.isApproved ? 'success' : 'warning'} dot>
            {salon.isApproved ? 'Approved' : 'Pending'}
          </Badge>
          <Badge variant={salon.isActive ? 'success' : 'error'} dot>
            {salon.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </PageActions>
      </PageHeader>

      {/* Tabs */}
      <TabList>
        {TABS.map((t, i) => (
          <TabBtn key={t} active={tab === i} data-active={String(tab === i)} onClick={() => setTab(i)}>
            {t === 'Live Queue' && activeQueue.length > 0 ? `Queue (${activeQueue.length})` : t}
          </TabBtn>
        ))}
      </TabList>

      {/* ── Overview ── */}
      {tab === 0 && (
        <div style={{ display: 'grid', gap: theme.spacing['6'] }}>
          <Card>
            <CardTitle style={{ marginBottom: theme.spacing['6'] }}>Salon Details</CardTitle>
            <InfoGrid>
              <InfoRow><InfoLabel>Name</InfoLabel><InfoValue>{salon.name}</InfoValue></InfoRow>
              {salon.nameAr && <InfoRow><InfoLabel>Name (Arabic)</InfoLabel><InfoValue style={{ fontFamily: theme.typography.fontArabic }}>{salon.nameAr}</InfoValue></InfoRow>}
              <InfoRow><InfoLabel>City</InfoLabel><InfoValue>{salon.city}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Address</InfoLabel><InfoValue>{salon.address}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Phone</InfoLabel><InfoValue>{salon.phone || '—'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Gender Policy</InfoLabel><InfoValue>{salon.genderPolicy.replace('_', ' ')}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Hours</InfoLabel><InfoValue>{salon.openTime} – {salon.closeTime}</InfoValue></InfoRow>
              <InfoRow>
                <InfoLabel>Working Days</InfoLabel>
                <ScheduleChips style={{ marginTop: theme.spacing['1'] }}>
                  {DAY_NAMES.map((d, i) => (
                    <DayChip key={d} off={!salon.workingDays.includes(i)}>{d}</DayChip>
                  ))}
                </ScheduleChips>
              </InfoRow>
            </InfoGrid>
            {salon.description && (
              <>
                <Divider />
                <InfoRow>
                  <InfoLabel>Description</InfoLabel>
                  <InfoValue style={{ lineHeight: theme.typography.leading.relaxed, marginTop: theme.spacing['2'] }}>{salon.description}</InfoValue>
                </InfoRow>
              </>
            )}
          </Card>
        </div>
      )}

      {/* ── Services ── */}
      {tab === 1 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: theme.spacing['6'] }}>
            <Button size="sm">+ Add Service</Button>
          </div>
          {!salon.services?.length ? (
            <EmptyState>No services yet</EmptyState>
          ) : (
            <ServiceGrid>
              {salon.services.map((svc) => (
                <ServiceCard key={svc.id}>
                  <ServiceHeader>
                    <div>
                      <ServiceName>{svc.name}</ServiceName>
                      {svc.nameAr && <p style={{ fontSize: theme.typography.size.sm, color: theme.colors.textMuted, fontFamily: theme.typography.fontArabic }}>{svc.nameAr}</p>}
                    </div>
                    <Badge variant={svc.isActive ? 'success' : 'default'} dot>
                      {svc.isActive ? 'Active' : 'Off'}
                    </Badge>
                  </ServiceHeader>
                  {svc.description && <p style={{ fontSize: theme.typography.size.sm, color: theme.colors.textSecondary }}>{svc.description}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ServiceMeta>
                      <ServiceMetaItem>⏱ {svc.durationMin} min</ServiceMetaItem>
                    </ServiceMeta>
                    <ServicePrice>{svc.price} JOD</ServicePrice>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div style={{ display: 'flex', gap: theme.spacing['2'] }}>
                    <Button variant="secondary" size="sm" fullWidth>Edit</Button>
                    <Button variant="ghost" size="sm">
                      {svc.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </ServiceCard>
              ))}
            </ServiceGrid>
          )}
        </>
      )}

      {/* ── Staff ── */}
      {tab === 2 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: theme.spacing['6'] }}>
            <Button size="sm">+ Add Staff</Button>
          </div>
          {!salon.staff?.length ? (
            <EmptyState>No staff yet</EmptyState>
          ) : (
            <StaffGrid>
              {salon.staff.map((member) => (
                <StaffCard key={member.id}>
                  <Avatar size={72} src={member.avatarUrl} name={member.name} />
                  <div>
                    <StaffName>{member.name}</StaffName>
                    {member.nameAr && <p style={{ fontFamily: theme.typography.fontArabic, fontSize: theme.typography.size.sm, color: theme.colors.textSecondary }}>{member.nameAr}</p>}
                  </div>
                  {member.bio && <StaffBio>{member.bio}</StaffBio>}
                  {member.schedules && member.schedules.length > 0 && (
                    <ScheduleChips>
                      {DAY_NAMES.map((d, i) => {
                        const sched = member.schedules?.find((s) => s.dayOfWeek === i);
                        return <DayChip key={d} off={!sched || sched.isOff}>{d}</DayChip>;
                      })}
                    </ScheduleChips>
                  )}
                  {member.services && member.services.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing['1'], justifyContent: 'center' }}>
                      {member.services.map((ss) => (
                        <Badge key={ss.service.id} variant="gold">{ss.service.name}</Badge>
                      ))}
                    </div>
                  )}
                  <Button variant="secondary" size="sm" fullWidth>Edit Schedule</Button>
                </StaffCard>
              ))}
            </StaffGrid>
          )}
        </>
      )}

      {/* ── Bookings ── */}
      {tab === 3 && (
        <>
          {bookings.length === 0 ? (
            <EmptyState>No bookings yet</EmptyState>
          ) : (
            <BookingsList>
              {bookings.map((b) => (
                <BookingRow key={b.id} padding="4">
                  <BookingCustomer>
                    <p>{b.customer?.name || 'Customer'}</p>
                    <p>{b.customer?.phone || '—'}</p>
                  </BookingCustomer>
                  <BookingDetail>
                    <p>{b.service?.name}</p>
                    <p>{b.staff?.name || 'Any staff'}</p>
                  </BookingDetail>
                  <BookingDetail>
                    <p>{new Date(b.startTime).toLocaleDateString('en-JO', { month: 'short', day: 'numeric' })}</p>
                    <p>{new Date(b.startTime).toLocaleTimeString('en-JO', { hour: '2-digit', minute: '2-digit' })}</p>
                  </BookingDetail>
                  <Badge variant={statusBadge(b.status)} dot>{b.status.toLowerCase()}</Badge>
                  <div style={{ color: theme.colors.primary, fontWeight: theme.typography.weight.semibold, fontSize: theme.typography.size.base }}>
                    {b.totalPrice} JOD
                  </div>
                  {['PENDING', 'CONFIRMED'].includes(b.status) && (
                    <Button variant="ghost" size="sm">Cancel</Button>
                  )}
                  {b.status === 'CONFIRMED' && (
                    <Button variant="success" size="sm">Complete</Button>
                  )}
                </BookingRow>
              ))}
            </BookingsList>
          )}
        </>
      )}

      {/* ── Live Queue ── */}
      {tab === 4 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing['6'] }}>
            <div>
              <p style={{ fontSize: theme.typography.size.lg, fontWeight: theme.typography.weight.semibold, color: theme.colors.textPrimary }}>
                {activeQueue.length} {activeQueue.length === 1 ? 'person' : 'people'} in queue
              </p>
              <p style={{ fontSize: theme.typography.size.sm, color: theme.colors.textSecondary }}>
                Auto-refreshes every 10 seconds
              </p>
            </div>
            <Button onClick={callNext} disabled={queueLoading}>
              {queueLoading ? <Spinner size={16} color={theme.colors.textInverse} /> : '📣 Call Next'}
            </Button>
          </div>

          {activeQueue.length === 0 ? (
            <EmptyState>Queue is empty right now</EmptyState>
          ) : (
            <QueueGrid>
              {activeQueue.map((entry) => (
                <QueueCard key={entry.id}>
                  <QueueNum status={entry.status}>#{entry.position}</QueueNum>
                  <QueueCustomer>
                    <p>{entry.customer?.name || 'Customer'}</p>
                    <p>
                      {entry.service?.name || 'No service'}
                      {entry.staff && ` · ${entry.staff.name}`}
                      {' · ~'}{entry.estimatedWaitMin || 0} min wait
                    </p>
                  </QueueCustomer>
                  <Badge variant={
                    entry.status === 'SERVING' ? 'success' :
                    entry.status === 'CALLED' ? 'info' : 'warning'
                  } dot>
                    {entry.status.toLowerCase()}
                  </Badge>
                  <QueueActions>
                    {entry.status === 'CALLED' && (
                      <Button variant="success" size="sm" onClick={() => serveEntry(entry.id)}>
                        Serving
                      </Button>
                    )}
                    {entry.status === 'SERVING' && (
                      <Button variant="secondary" size="sm" onClick={() => doneEntry(entry.id)}>
                        Done ✓
                      </Button>
                    )}
                  </QueueActions>
                </QueueCard>
              ))}
            </QueueGrid>
          )}
        </>
      )}
    </Layout>
  );
}
