'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useAuthStore } from '@/features/auth/auth.store';
import { DESKTOP_NAV } from '@/constants/nav.desktop';
import { BRAND } from '@/constants/text';
import { ROUTES } from '@/constants';
import { DEFAULT_LOCALE } from '@/constants/locale';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';
import * as styles from './DesktopLayout.styles';

interface DesktopLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DesktopLayout({ children, title }: DesktopLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || DEFAULT_LOCALE;
  const { user, logout, hydrate, isHydrated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (isHydrated && !user) router.push(ROUTES.LOGIN);
  }, [isHydrated, user, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  if (!isHydrated) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  const sections = Array.from(new Set(DESKTOP_NAV.map((n) => n.section)));
  const desktopRoutes = ROUTES.DESKTOP(locale);

  const sidebarContent = (
    <>
      {/* Logo */}
      <Box sx={styles.logoBox}>
        <Box sx={styles.logoIconBox}>
          {BRAND.ICON}
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.BOLD, lineHeight: 1.2 }}>
            {BRAND.NAME}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: 0.08, textTransform: 'uppercase' }}
          >
            {BRAND.SUBTITLE}
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={styles.navList}>
        {sections.map((section) => (
          <React.Fragment key={section}>
            <ListSubheader
              disableSticky
              sx={styles.navSectionHeader}
            >
              {section}
            </ListSubheader>
            {DESKTOP_NAV.filter((n) => n.section === section).map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== desktopRoutes.DASHBOARD &&
                  pathname.startsWith(item.href + '/')) ||
                (item.href === desktopRoutes.DASHBOARD &&
                  pathname === desktopRoutes.DASHBOARD);
              return (
                <ListItemButton
                  key={item.href}
                  component={Link}
                  href={item.href}
                  selected={active}
                  sx={{ borderRadius: 1, mb: 0.5 }}
                >
                  {item.icon && (
                    <Box
                      component="span"
                      sx={styles.navItemIcon}
                    >
                      {item.icon}
                    </Box>
                  )}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </React.Fragment>
        ))}
      </List>

      {/* Footer / User Info */}
      <Box sx={styles.userFooter}>
        <Box
          onClick={handleLogout}
          sx={styles.userInfoBox}
          title="Click to logout"
        >
          <Avatar sx={styles.userAvatar}>
            {initials}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} noWrap>
              {user?.name || 'User'}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: 'capitalize' }}
            >
              {user?.role?.toLowerCase().replace('_', ' ')}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            ↩
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — permanent */}
      <Drawer
        variant="permanent"
        sx={styles.desktopDrawer}
        open
      >
        {sidebarContent}
      </Drawer>

      {/* Mobile sidebar — temporary */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Mobile top bar */}
      <AppBar
        position="fixed"
        sx={styles.appBar}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1, color: 'text.secondary' }}
            aria-label="open menu"
          >
            ☰
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: FONT_WEIGHT.BOLD }}>
            {title || BRAND.NAME}
          </Typography>
          <Avatar sx={styles.mobileAvatar}>
            {initials}
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          ml: { xs: 0, lg: '240px' },
        }}
      >
        <Box sx={styles.contentWrapper}>
          {children}
        </Box>
      </Box>
    </>
  );
}
