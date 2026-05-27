'use client';
import { Box, Typography } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { DesktopLayout } from '../_layouts';

export default function ClientsPage() {
  return (
    <DesktopLayout title="Clients">
      <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }}>Clients</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        Client management
      </Typography>
      <Box sx={{ textAlign: 'center', py: 16, color: 'text.secondary' }}>
        Clients page coming soon
      </Box>
    </DesktopLayout>
  );
}
