'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/features/auth/auth.store';
import { MOBILE_NAV } from '@/constants/nav.mobile';
import { ROUTES } from '@/constants';
import { BRAND } from '@/constants/text';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  CircularProgress,
} from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import * as styles from './MobileLayout.styles';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: React.ReactNode;
}

export default function MobileLayout({ children, title, subtitle }: MobileLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, hydrate, isHydrated } = useAuthStore();

  useEffect(() => {
    hydrate();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  useEffect(() => {
    if (isHydrated && !user) router.push(ROUTES.LOGIN);
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: '68px' }}>
      {/* Sticky header */}
      <Box
        sx={styles.stickyHeader}
      >
        <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }}>
          {title || BRAND.NAME}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Page content */}
      <Box sx={{ p: 2 }}>{children}</Box>

      {/* Bottom navigation */}
      <BottomNavigation
        value={pathname}
        showLabels
        sx={styles.bottomNav}
      >
        {MOBILE_NAV.map((item) => (
          <BottomNavigationAction
            key={item.href}
            label={item.label}
            value={item.href}
            icon={
              <Box component="span" sx={{ fontSize: FONT_SIZE.XL }}>
                {item.icon}
              </Box>
            }
            component={Link}
            href={item.href}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
