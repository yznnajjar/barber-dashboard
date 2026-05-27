import { FONT_SIZE, FONT_WEIGHT, RADIUS } from '@/design-system';

export const styles = {
  // Page-level
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    p: 20,
  },
  notFound: {
    textAlign: 'center',
    py: 16,
    color: 'text.secondary',
  },
  tabBar: {
    display: 'flex',
    gap: 0.5,
    mb: 3,
    borderBottom: 1,
    borderColor: 'divider',
    overflowX: 'auto',
  },
  tabButton: {
    px: 2.5,
    py: 1.5,
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.MEDIUM,
    bgcolor: 'transparent',
    border: 'none',
    borderBottom: 2,
    borderRadius: 0,
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    textTransform: 'none',
    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
  },

  // SalonsOverview
  overviewCard: { p: 3 },
  detailGrid: { display: 'grid', gap: 2 },
  detailLabel: {
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    color: 'custom.textMuted',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block',
    mb: 0.25,
  },
  overviewArabic: {
    fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif",
  },
  dayRow: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
    mt: 0.5,
  },
  dayChip: {
    px: 0.875,
    py: 0.25,
    borderRadius: RADIUS.FULL,
    fontSize: FONT_SIZE.XS,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  descriptionText: {
    lineHeight: 1.75,
    mt: 0.5,
  },

  // SalonsServices
  servicesHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: 3,
  },
  servicesEmpty: {
    textAlign: 'center',
    py: 16,
    color: 'text.secondary',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 3,
  },
  servicesCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    p: 3,
  },
  servicesCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 1,
  },
  servicesArabic: {
    color: 'custom.textMuted',
    fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif",
  },
  servicesMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicesActionRow: {
    display: 'flex',
    gap: 1,
  },

  // SalonsStaff
  staffHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    mb: 3,
  },
  staffEmpty: {
    textAlign: 'center',
    py: 16,
    color: 'text.secondary',
  },
  staffGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 3,
  },
  staffCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1.5,
    textAlign: 'center',
    p: 3,
  },
  staffAvatar: {
    width: 72,
    height: 72,
    fontSize: FONT_SIZE['2XL'],
    fontWeight: FONT_WEIGHT.BOLD,
  },
  staffArabic: {
    color: 'text.secondary',
    fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif",
  },
  staffDayRow: {
    display: 'flex',
    gap: 0.5,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  staffDayChip: {
    px: 0.875,
    py: 0.25,
    borderRadius: RADIUS.FULL,
    fontSize: FONT_SIZE.XS,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  staffServiceRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    justifyContent: 'center',
  },

  // SalonsBookings
  bookingsEmpty: {
    textAlign: 'center',
    py: 16,
    color: 'text.secondary',
  },
  bookingsCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 1,
    p: 2,
  },

  // SalonsQueue
  queueHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 3,
  },
  queueEmpty: {
    textAlign: 'center',
    py: 16,
    color: 'text.secondary',
  },
  queueList: {
    display: 'grid',
    gap: 1.5,
  },
  queueCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    p: 2,
    px: 2.5,
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'divider',
    borderRadius: 1.25,
  },
  queuePosBox: {
    width: 36,
    height: 36,
    borderRadius: 1.25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: FONT_SIZE.SM,
    flexShrink: 0,
  },
  queueInfo: {
    flex: 1,
    minWidth: 0,
  },
  queueActionBox: {
    display: 'flex',
    gap: 0.5,
  },
};
