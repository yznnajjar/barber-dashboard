'use client';
import { Box, Typography } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { DesktopLayout } from '../_layouts';

export default function StaffPage() {
  return (
    <DesktopLayout title="Staff">
      <Typography variant="h4" sx={{ fontWeight: FONT_WEIGHT.BOLD }}>Staff</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        Manage your team
      </Typography>
      <Box sx={{ textAlign: 'center', py: 16, color: 'text.secondary' }}>
        Staff page coming soon
      </Box>
    </DesktopLayout>
  );
}
