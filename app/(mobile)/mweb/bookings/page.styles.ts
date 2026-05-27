import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';

export const filterRow = {
  display: 'flex',
  gap: 0.5,
  mb: 2,
  overflowX: 'auto',
  pb: 0.5,
};

export const bookingsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const emptyState = {
  textAlign: 'center',
  py: 16,
  color: 'text.secondary',
};

export const cardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  mb: 1,
};

export const customerName = {
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  fontSize: FONT_SIZE.MD,
  color: 'text.primary',
};

export const priceRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 3,
};

export const priceText = {
  fontSize: FONT_SIZE.MD,
  fontWeight: FONT_WEIGHT.BOLD,
  color: 'primary.main',
};
