'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { ROUTES } from '@/constants';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <Typography variant="h3" sx={{ fontWeight: FONT_WEIGHT.BOLD }} color="error">
        Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {error.message || 'An unexpected error occurred'}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
        <Button variant="contained" onClick={reset}>Try again</Button>
        <Button
          component={Link}
          href={ROUTES.DESKTOP().DASHBOARD}
          variant="outlined"
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
}
