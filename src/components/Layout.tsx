import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '../lib/authStore';
import { Spinner } from './ui';
import {
  SidebarWrap, SidebarLogo, LogoMark, LogoText, SidebarNav, NavLabel, NavItem,
  SidebarFooter, UserInfo, UserAvatar, UserName, LogoutIcon,
  TopBar, HamburgerBtn, TopBarTitle, Overlay,
  Main, PageContent, BottomNav, BottomNavItem, LoadingScreen,
} from './Layout.styles';

export {
  PageHeader, PageTitle, PageSubtitle, PageActions,
} from './Layout.styles';

interface NavEntry {
  href: string;
  icon: string;
  label: string;
  section?: string;
}

const NAV: NavEntry[] = [
  { href: '/dashboard', icon: '◈', label: 'Overview',   section: 'Main' },
  { href: '/bookings',  icon: '◷', label: 'Bookings',   section: 'Main' },
  { href: '/queue',     icon: '⋮⋮', label: 'Live Queue', section: 'Main' },
  { href: '/staff',     icon: '◉', label: 'Staff',      section: 'Manage' },
  { href: '/services',  icon: '✦', label: 'Services',   section: 'Manage' },
  { href: '/reviews',   icon: '★', label: 'Reviews',    section: 'Manage' },
  { href: '/analytics', icon: '▨', label: 'Analytics',  section: 'Reports' },
  { href: '/clients',   icon: '◎', label: 'Clients',    section: 'Reports' },
];

const BOTTOM_NAV: NavEntry[] = [
  { href: '/dashboard', icon: '◈', label: 'Home' },
  { href: '/bookings',  icon: '◷', label: 'Bookings' },
  { href: '/queue',     icon: '⋮⋮', label: 'Queue' },
  { href: '/staff',     icon: '◉', label: 'Staff' },
];

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();
  const { user, logout, hydrate, isHydrated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { hydrate(); }, []);

  useEffect(() => {
    if (isHydrated && !user) router.push('/login');
  }, [isHydrated, user]);

  useEffect(() => { setSidebarOpen(false); }, [router.pathname]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  if (!isHydrated) {
    return (
      <LoadingScreen>
        <Spinner size={32} />
      </LoadingScreen>
    );
  }

  const sections = Array.from(new Set(NAV.map((n) => n.section)));

  return (
    <>
      <SidebarWrap open={sidebarOpen}>
        <SidebarLogo>
          <LogoMark>✂</LogoMark>
          <LogoText>
            <h1>Barber</h1>
            <p>Dashboard</p>
          </LogoText>
        </SidebarLogo>

        <SidebarNav>
          {sections.map((section) => (
            <React.Fragment key={section}>
              <NavLabel>{section}</NavLabel>
              {NAV.filter((n) => n.section === section).map((item) => {
                const active = router.pathname === item.href || router.pathname.startsWith(item.href + '/');
                return (
                  <Link href={item.href} key={item.href} passHref legacyBehavior>
                    <NavItem active={active} data-active={String(active)}>
                      <span className="icon">{item.icon}</span>
                      {item.label}
                    </NavItem>
                  </Link>
                );
              })}
            </React.Fragment>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <UserInfo onClick={handleLogout} title="Click to logout">
            <UserAvatar>{initials}</UserAvatar>
            <UserName>
              <p>{user?.name || 'User'}</p>
              <p>{user?.role?.toLowerCase().replace('_', ' ')}</p>
            </UserName>
            <LogoutIcon>↩</LogoutIcon>
          </UserInfo>
        </SidebarFooter>
      </SidebarWrap>

      <TopBar>
        <HamburgerBtn onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '☰'}
        </HamburgerBtn>
        <TopBarTitle>{title || 'Barber'}</TopBarTitle>
        <UserAvatar small>{initials}</UserAvatar>
      </TopBar>

      <Overlay visible={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      <Main>
        <PageContent>{children}</PageContent>
      </Main>

      <BottomNav>
        {BOTTOM_NAV.map((item) => {
          const active = router.pathname === item.href;
          return (
            <Link href={item.href} key={item.href} passHref legacyBehavior>
              <BottomNavItem active={active}>
                <span className="icon">{item.icon}</span>
                {item.label}
              </BottomNavItem>
            </Link>
          );
        })}
      </BottomNav>
    </>
  );
}
