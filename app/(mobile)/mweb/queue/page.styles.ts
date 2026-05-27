import { keyframes } from '@mui/material/styles';
import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

export const liveDot = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  bgcolor: 'success.main',
  animation: `${pulse} 2s ease infinite`,
  mr: 0.75,
};

export const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 1,
  mb: 4,
};

export const statValue = {
  fontSize: FONT_SIZE['2XL'],
  fontWeight: FONT_WEIGHT.BOLD,
  fontFamily: '"Playfair Display", serif',
  lineHeight: 1,
};

export const queueList = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const emptyState = {
  textAlign: 'center',
  py: 16,
  color: 'text.secondary',
};

export const queueCard = {
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  borderLeft: '4px solid',
  borderRadius: '14px',
  p: 2,
};

export const cardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 1,
};

export const waitBadge = {
  bgcolor: 'custom.bgElevated',
  borderRadius: '8px',
  py: 0.5,
  px: 1.5,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  fontSize: FONT_SIZE.BASE,
  color: 'primary.main',
  fontWeight: FONT_WEIGHT.MEDIUM,
  mb: 1.5,
};

export const actionButtons = {
  display: 'flex',
  gap: 0.5,
  justifyContent: 'flex-end',
};
