import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';

export const greeting = {
  fontFamily: '"Playfair Display", serif',
  fontSize: FONT_SIZE['2XL'],
  fontWeight: FONT_WEIGHT.BOLD,
  color: 'text.primary',
  mb: 6,
};

export const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 3,
  mb: 6,
};

export const sectionTitle = {
  fontSize: FONT_SIZE.LG,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  color: 'text.primary',
  mb: 3,
};

export const activityCard = {
  p: 2,
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 3,
};

export const emptyState = {
  color: 'custom.textMuted',
  textAlign: 'center',
  py: 8,
};

export const avatar = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  bgcolor: 'custom.bgElevated',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  color: 'primary.main',
};
