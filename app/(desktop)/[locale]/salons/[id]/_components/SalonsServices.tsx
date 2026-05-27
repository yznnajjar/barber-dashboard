import { Box, Typography, Card, Chip, Divider, Button } from '@mui/material';
import { FONT_WEIGHT } from '@/design-system';
import { SALON_DETAIL, COMMON } from '@/constants/text';
import { styles } from './salon.styles';
import type { Service } from '@/types';

export default function SalonsServices({ services }: { services: Service[] }) {
  return (
    <>
      <Box sx={styles.servicesHeader}>
        <Button size="small">{SALON_DETAIL.ADD_SERVICE}</Button>
      </Box>
      {!services?.length ? (
        <Box sx={styles.servicesEmpty}>
          {SALON_DETAIL.NO_SERVICES}
        </Box>
      ) : (
        <Box sx={styles.servicesGrid}>
          {services.map((svc) => (
            <Card key={svc.id} sx={styles.servicesCard}>
              <Box sx={styles.servicesCardHeader}>
                <Box>
                  <Typography sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">{svc.name}</Typography>
                  {svc.nameAr && (
                    <Typography variant="body2" sx={styles.servicesArabic}>
                      {svc.nameAr}
                    </Typography>
                  )}
                </Box>
                <Chip
                  label={svc.isActive ? SALON_DETAIL.SERVICE_ACTIVE : SALON_DETAIL.SERVICE_OFF}
                  color={svc.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Box>
              {svc.description && (
                <Typography variant="body2" color="text.secondary">{svc.description}</Typography>
              )}
              <Box sx={styles.servicesMetaRow}>
                <Typography variant="body2" color="text.secondary">
                  ⏱ {svc.durationMin} min
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.BOLD }} color="primary">
                  {svc.price} {COMMON.CURRENCY}
                </Typography>
              </Box>
              <Divider sx={{ my: 0 }} />
              <Box sx={styles.servicesActionRow}>
                <Button variant="outlined" size="small" fullWidth>{SALON_DETAIL.EDIT}</Button>
                <Button variant="text" size="small">
                  {svc.isActive ? SALON_DETAIL.DEACTIVATE : SALON_DETAIL.ACTIVATE}
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
