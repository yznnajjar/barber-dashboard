export const loadingBox = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const stickyHeader = {
  px: 2,
  pt: 2,
  pb: 0.5,
  bgcolor: 'background.default',
  position: 'sticky',
  top: 0,
  zIndex: 10,
};

export const bottomNav = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: 64,
  borderTop: 1,
  borderColor: 'divider',
  bgcolor: 'background.paper',
  pb: 'env(safe-area-inset-bottom, 0)',
};
