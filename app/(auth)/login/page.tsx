'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/auth.store';
import { Box, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { BRAND, LOGIN, TEST_ACCOUNTS } from '@/constants/text';
import { ROUTES } from '@/constants';
import {
  Page, LeftPanel, BrandMark, BrandName, BrandTagline, Features, Feature,
  RightPanel, LoginBox, LoginHeader, LoginTitle, LoginSubtitle,
  MobileBrand, MobileBrandIcon, MobileBrandText,
  TestAccounts, TestAccountsLabel, TestAccountItem, TestAccountRole, TestAccountEmail,
} from './login.styles';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, user, isHydrated, hydrate } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { hydrate(); }, []);

  useEffect(() => {
    if (isHydrated && user) router.push(ROUTES.DESKTOP().DASHBOARD);
  }, [isHydrated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError(LOGIN.ERROR_EMPTY);
      return;
    }
    try {
      await login(email, password);
      router.push(ROUTES.DESKTOP().DASHBOARD);
    } catch (err: any) {
      setError(err?.response?.data?.error || LOGIN.ERROR_INVALID);
    }
  };

  return (
    <Page>
      <LeftPanel>
        <BrandMark>{BRAND.ICON}</BrandMark>
        <BrandName>{BRAND.NAME}<br />{BRAND.SUBTITLE}</BrandName>
        <BrandTagline>{BRAND.TAGLINE}</BrandTagline>
        <Features>
          {BRAND.FEATURES.map((f) => <Feature key={f}>{f}</Feature>)}
        </Features>
      </LeftPanel>

      <RightPanel>
        <LoginBox>
          <MobileBrand>
            <MobileBrandIcon>{BRAND.ICON}</MobileBrandIcon>
            <MobileBrandText>{BRAND.NAME}</MobileBrandText>
          </MobileBrand>

          <LoginHeader>
            <LoginTitle>{LOGIN.TITLE}</LoginTitle>
            <LoginSubtitle>{LOGIN.SUBTITLE}</LoginSubtitle>
          </LoginHeader>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              id="email"
              type="email"
              label={LOGIN.EMAIL_LABEL}
              placeholder={LOGIN.EMAIL_PLACEHOLDER}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />

            <TextField
              id="password"
              type="password"
              label={LOGIN.PASSWORD_LABEL}
              placeholder={LOGIN.PASSWORD_PLACEHOLDER}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} sx={{ color: 'background.paper' }} /> : LOGIN.SUBMIT}
            </Button>
          </Box>

          <TestAccounts>
            <TestAccountsLabel>{LOGIN.TEST_ACCOUNTS_LABEL}</TestAccountsLabel>
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
  );
}
