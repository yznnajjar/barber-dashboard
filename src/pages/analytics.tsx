import Head from 'next/head';
import Layout, { PageHeader, PageTitle, PageSubtitle } from '../components/Layout';
import { EmptyState } from '../components/ui';

export default function Page() {
  const title = 'analytics'.charAt(0).toUpperCase() + 'analytics'.slice(1);
  return (
    <Layout title={title}>
      <Head><title>{title} — Barber</title></Head>
      <PageHeader>
        <div>
          <PageTitle>{title}</PageTitle>
          <PageSubtitle>Coming soon</PageSubtitle>
        </div>
      </PageHeader>
      <EmptyState>{title} page coming soon</EmptyState>
    </Layout>
  );
}
