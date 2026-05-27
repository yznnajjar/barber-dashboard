'use client';

import { Box, Typography } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';

export const PageHeader = (props: React.ComponentProps<typeof Box>) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 2,
      mb: 4,
      flexWrap: 'wrap',
    }}
    {...props}
  />
);

export const PageTitle = (props: React.ComponentProps<typeof Typography>) => (
  <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }} {...props} />
);

export const PageSubtitle = (props: React.ComponentProps<typeof Typography>) => (
  <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }} {...props} />
);

export const PageActions = (props: React.ComponentProps<typeof Box>) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }} {...props} />
);
