import { ROUTES } from '@/constants';

export interface NavEntry {
  href: string;
  icon: string;
  label: string;
  section: string;
}

export const DESKTOP_NAV: NavEntry[] = [
  { href: ROUTES.DESKTOP().DASHBOARD, icon: '◈', label: 'Overview',   section: 'Main' },
  { href: ROUTES.DESKTOP().BOOKINGS,  icon: '◷', label: 'Bookings',   section: 'Main' },
  { href: ROUTES.DESKTOP().QUEUE,     icon: '⋮⋮', label: 'Live Queue', section: 'Main' },
  { href: ROUTES.DESKTOP().STAFF,     icon: '◉', label: 'Staff',      section: 'Manage' },
  { href: ROUTES.DESKTOP().SERVICES,  icon: '✦', label: 'Services',   section: 'Manage' },
  { href: ROUTES.DESKTOP().REVIEWS,   icon: '★', label: 'Reviews',    section: 'Manage' },
  { href: ROUTES.DESKTOP().ANALYTICS, icon: '▨', label: 'Analytics',  section: 'Reports' },
  { href: ROUTES.DESKTOP().CLIENTS,   icon: '◎', label: 'Clients',    section: 'Reports' },
];
