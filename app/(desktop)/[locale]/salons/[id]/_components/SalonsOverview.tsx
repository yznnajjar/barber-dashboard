import { Box, Typography, Card, Divider } from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT, RADIUS } from '@/design-system';
import { SALON_DETAIL, DAY_NAMES } from '@/constants/text';
import { styles } from './salon.styles';
import type { Salon } from '@/types';

export default function SalonsOverview({ salon }: { salon: Salon }) {
  return (
    <Card sx={styles.overviewCard}>
      <Typography variant="h6" sx={{ mb: 3 }}>{SALON_DETAIL.DETAILS_TITLE}</Typography>
      <Box sx={styles.detailGrid}>
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            Name
          </Typography>
          <Typography variant="body1" color="text.primary">{salon.name}</Typography>
        </Box>
        {salon.nameAr && (
          <Box>
            <Typography variant="caption" sx={styles.detailLabel}>
              Name (Arabic)
            </Typography>
            <Typography variant="body1" color="text.primary" sx={styles.overviewArabic}>
              {salon.nameAr}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            City
          </Typography>
          <Typography variant="body1" color="text.primary">{salon.city}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            Address
          </Typography>
          <Typography variant="body1" color="text.primary">{salon.address}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            Phone
          </Typography>
          <Typography variant="body1" color="text.primary">{salon.phone || '—'}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            Gender Policy
          </Typography>
          <Typography variant="body1" color="text.primary">{salon.genderPolicy.replace('_', ' ')}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            Hours
          </Typography>
          <Typography variant="body1" color="text.primary">{salon.openTime} – {salon.closeTime}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={styles.detailLabel}>
            Working Days
          </Typography>
          <Box sx={styles.dayRow}>
            {DAY_NAMES.map((d, i) => (
              <Box
                key={d}
                component="span"
                sx={{
                  ...styles.dayChip,
                  bgcolor: salon.workingDays.includes(i) ? 'custom.primaryMuted' : 'custom.bgElevated',
                  color: salon.workingDays.includes(i) ? 'primary.main' : 'custom.textMuted',
                }}
              >
                {d}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {salon.description && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography variant="caption" sx={styles.detailLabel}>
              Description
            </Typography>
            <Typography variant="body1" color="text.primary" sx={styles.descriptionText}>
              {salon.description}
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
}
