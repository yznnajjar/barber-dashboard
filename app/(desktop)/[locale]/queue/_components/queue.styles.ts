import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';

export const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 4,
    mb: 3,
  },
  statBox: {
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'divider',
    borderRadius: 1.75,
    p: 2.5,
    textAlign: 'center',
  },
  statNumber: {
    fontWeight: FONT_WEIGHT.BOLD,
    fontFamily: '"Playfair Display", serif',
  },
  queueList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  emptyState: {
    textAlign: 'center',
    py: 16,
    color: 'text.secondary',
  },
  emptyIcon: {
    fontSize: 32,
    opacity: 0.3,
    mb: 0.5,
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
    borderLeft: 3,
    borderRadius: 1.25,
  },
  posBox: {
    width: 36,
    height: 36,
    borderRadius: 1.25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.BOLD,
    flexShrink: 0,
  },
  queueInfo: {
    flex: 1,
    minWidth: 0,
  },
  waitBox: {
    textAlign: 'center',
  },
  actionBox: {
    display: 'flex',
    gap: 0.5,
  },
  liveIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    bgcolor: 'success.main',
    animation: 'pulse 2s ease infinite',
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.3 },
    },
  },
};
