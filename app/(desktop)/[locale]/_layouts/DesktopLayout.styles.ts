import { FONT_SIZE, FONT_WEIGHT } from '@/design-system';

export const loadingBox = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const logoBox = {
  p: 3,
  borderBottom: 1,
  borderColor: 'divider',
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
};

export const logoIconBox = {
  width: 36,
  height: 36,
  borderRadius: 1,
  bgcolor: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: FONT_SIZE.LG,
  color: 'background.paper',
  flexShrink: 0,
};

export const navList = {
  flex: 1,
  px: 1.5,
  overflow: 'auto',
};

export const navSectionHeader = {
  letterSpacing: 0.1,
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  fontWeight: FONT_WEIGHT.SEMIBOLD,
  color: 'text.secondary',
  lineHeight: 2.5,
  px: 1,
};

export const navItemIcon = {
  mr: 1.5,
  fontSize: FONT_SIZE.LG,
  width: 24,
  textAlign: 'center',
  flexShrink: 0,
};

export const userFooter = {
  borderTop: 1,
  borderColor: 'divider',
  p: 1.5,
};

export const userInfoBox = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  p: 1.5,
  borderRadius: 1,
  cursor: 'pointer',
  '&:hover': { bgcolor: 'action.hover' },
};

export const userAvatar = {
  width: 34,
  height: 34,
  bgcolor: 'primary.main',
  fontSize: 14,
  fontWeight: FONT_WEIGHT.BOLD,
};

export const desktopDrawer = {
  width: 240,
  flexShrink: 0,
  display: { xs: 'none', lg: 'block' },
  '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
};

export const appBar = {
  display: { lg: 'none' },
  bgcolor: 'background.paper',
  color: 'text.primary',
  boxShadow: 1,
};

export const mobileAvatar = {
  width: 32,
  height: 32,
  bgcolor: 'primary.main',
  fontSize: 12,
  fontWeight: FONT_WEIGHT.BOLD,
};

export const contentWrapper = {
  p: { xs: 2, lg: 4 },
  maxWidth: 1400,
  mx: 'auto',
  pt: { xs: '72px', lg: 4 },
};
