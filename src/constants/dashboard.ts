import { theme } from '@/shared/theme/tokens';

export const STATS = [
  { key: 'todayBookings', label: "Today's Bookings",    icon: '◷', color: theme.colors.infoMuted },
  { key: 'totalRevenue',  label: 'Total Revenue (JOD)', icon: '◈', color: theme.colors.primaryMuted },
  { key: 'queueLength',   label: 'In Queue Now',        icon: '⋮⋮', color: theme.colors.warningMuted },
  { key: 'avgRating',     label: 'Avg Rating',          icon: '★', color: theme.colors.successMuted },
];
