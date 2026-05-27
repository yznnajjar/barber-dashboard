'use client';

import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { ROUTES } from '@/constants';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: 'background.default',
      }}
    >
<Typography variant="h1" color="primary" sx={{fontWeight: FONT_WEIGHT.BOLD, fontSize: '5rem'}}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Page not found
      </Typography>
      <Button
        component={Link}
        href={ROUTES.DESKTOP().DASHBOARD}
        variant="contained"
        sx={{ mt: 1 }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}
