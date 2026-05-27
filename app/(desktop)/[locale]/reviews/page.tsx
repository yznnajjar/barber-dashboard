'use client';
import { Box, Typography } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { DesktopLayout } from '../_layouts';

export default function ReviewsPage() {
  return (
    <DesktopLayout title="Reviews">
      <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }}>Reviews</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        Customer feedback
      </Typography>
      <Box sx={{ textAlign: 'center', py: 16, color: 'text.secondary' }}>
        Reviews page coming soon
      </Box>
    </DesktopLayout>
  );
}
