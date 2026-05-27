'use client';
import { Box, Typography } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { DesktopLayout } from '../_layouts';

export default function ServicesPage() {
  return (
    <DesktopLayout title="Services">
      <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }}>Services</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        Manage your service catalog
      </Typography>
      <Box sx={{ textAlign: 'center', py: 16, color: 'text.secondary' }}>
        Services page coming soon
      </Box>
    </DesktopLayout>
  );
}
