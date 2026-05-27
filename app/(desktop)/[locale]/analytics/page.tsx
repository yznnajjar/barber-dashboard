'use client';
import { Box, Typography } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { DesktopLayout } from '../_layouts';

export default function AnalyticsPage() {
  return (
    <DesktopLayout title="Analytics">
      <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }}>Analytics</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        Coming soon
      </Typography>
      <Box sx={{ textAlign: 'center', py: 16, color: 'text.secondary' }}>
        Analytics page coming soon
      </Box>
    </DesktopLayout>
  );
}
