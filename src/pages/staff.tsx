import Head from 'next/head';
import Layout, { PageHeader, PageTitle, PageSubtitle } from '../components/Layout';
import { EmptyState } from '../components/ui';

export default function StaffPage() {
  return (
    <Layout title="Staff">
      <Head><title>Staff — Barber</title></Head>
      <PageHeader>
        <div>
          <PageTitle>Staff</PageTitle>
          <PageSubtitle>Manage your team</PageSubtitle>
        </div>
      </PageHeader>
      <EmptyState>Staff management coming soon</EmptyState>
    </Layout>
  );
}
