import { ROUTES } from '@/constants';

export interface NavEntry {
  href: string;
  icon: string;
  label: string;
}

export const MOBILE_NAV: NavEntry[] = [
  { href: ROUTES.MWEB.DASHBOARD, icon: '◈', label: 'Home' },
  { href: ROUTES.MWEB.BOOKINGS,  icon: '◷', label: 'Bookings' },
  { href: ROUTES.MWEB.QUEUE,     icon: '⋮⋮', label: 'Queue' },
  { href: ROUTES.MWEB.MORE,      icon: '◎', label: 'More' },
];
