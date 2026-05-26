import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuthStore } from '../lib/authStore';
import { theme } from '../lib/theme';
import { Button, Input, FormGroup, Label, ErrorText, Spinner } from '../components/ui';
import {
  Page, LeftPanel, BrandMark, BrandName, BrandTagline, Features, Feature,
  RightPanel, LoginBox, LoginHeader, LoginTitle, LoginSubtitle,
  Form, GlobalError, MobileBrand, MobileBrandIcon, MobileBrandText,
  TestAccounts, TestAccountsLabel, TestAccountItem, TestAccountRole, TestAccountEmail,
} from './login.styles';

const TEST_ACCOUNTS = [
  { role: 'Salon Owner', email: 'nour@example.com' },
  { role: 'Admin',       email: 'admin@barberapp.com' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, user, isHydrated, hydrate } = useAuthStore();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  useEffect(() => { hydrate(); }, []);
  useEffect(() => {
    if (isHydrated && user) router.push('/dashboard');
  }, [isHydrated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <>
      <Head>
        <title>Login — Barber Dashboard</title>
      </Head>

      <Page>
        <LeftPanel>
          <BrandMark>✂</BrandMark>
          <BrandName>Barber<br />Dashboard</BrandName>
          <BrandTagline>
            Manage your salon, staff, bookings, and live queue — all in one place.
          </BrandTagline>
          <Features>
            <Feature>Real-time walk-in queue management</Feature>
            <Feature>Smart booking &amp; availability engine</Feature>
            <Feature>Staff schedules &amp; performance</Feature>
            <Feature>Arabic-first, built for MENA</Feature>
          </Features>
        </LeftPanel>

        <RightPanel>
          <LoginBox>
            <MobileBrand>
              <MobileBrandIcon>✂</MobileBrandIcon>
              <MobileBrandText>Barber</MobileBrandText>
            </MobileBrand>

            <LoginHeader>
              <LoginTitle>Welcome back</LoginTitle>
              <LoginSubtitle>Sign in to your salon account</LoginSubtitle>
            </LoginHeader>

            <Form onSubmit={handleSubmit}>
              {error && <GlobalError>{error}</GlobalError>}

              <FormGroup>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </FormGroup>

              <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                {isLoading ? <Spinner size={18} color={theme.colors.textInverse} /> : 'Sign in'}
              </Button>
            </Form>

            <TestAccounts>
              <TestAccountsLabel>Test accounts</TestAccountsLabel>
              {TEST_ACCOUNTS.map((acc) => (
                <TestAccountItem
                  key={acc.email}
                  onClick={() => { setEmail(acc.email); setPassword('password123'); }}
                >
                  <TestAccountRole>{acc.role}</TestAccountRole>
                  <TestAccountEmail>{acc.email}</TestAccountEmail>
                </TestAccountItem>
              ))}
            </TestAccounts>
          </LoginBox>
        </RightPanel>
      </Page>
    </>
  );
}
