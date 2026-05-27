import { Box, Typography, Card, Chip, Avatar, Button } from '@mui/material';
import { FONT_SIZE, FONT_WEIGHT, RADIUS } from '@/design-system';
import { SALON_DETAIL, DAY_NAMES } from '@/constants/text';
import { styles } from './salon.styles';
import type { Staff } from '@/types';

export default function SalonsStaff({ staff }: { staff: Staff[] }) {
  return (
    <>
      <Box sx={styles.staffHeader}>
        <Button size="small">{SALON_DETAIL.ADD_STAFF}</Button>
      </Box>
      {!staff?.length ? (
        <Box sx={styles.staffEmpty}>
          {SALON_DETAIL.NO_STAFF}
        </Box>
      ) : (
        <Box sx={styles.staffGrid}>
          {staff.map((member) => (
            <Card key={member.id} sx={styles.staffCard}>
              <Avatar
                src={member.avatarUrl}
                sx={styles.staffAvatar}
              >
                {member.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }} color="text.primary">{member.name}</Typography>
                {member.nameAr && (
                  <Typography variant="body2" sx={styles.staffArabic}>
                    {member.nameAr}
                  </Typography>
                )}
              </Box>
              {member.bio && (
                <Typography variant="body2" color="text.secondary">{member.bio}</Typography>
              )}
              {member.schedules && member.schedules.length > 0 && (
                <Box sx={styles.staffDayRow}>
                  {DAY_NAMES.map((d, i) => {
                    const sched = member.schedules?.find((s) => s.dayOfWeek === i);
                    const isOff = !sched || sched.isOff;
                    return (
                      <Box
                        key={d}
                        component="span"
                        sx={{
                          ...styles.staffDayChip,
                          bgcolor: isOff ? 'custom.bgElevated' : 'custom.primaryMuted',
                          color: isOff ? 'custom.textMuted' : 'primary.main',
                        }}
                      >
                        {d}
                      </Box>
                    );
                  })}
                </Box>
              )}
              {member.services && member.services.length > 0 && (
                <Box sx={styles.staffServiceRow}>
                  {member.services.map((ss) => (
                    <Chip key={ss.service.id} label={ss.service.name} color="primary" size="small" />
                  ))}
                </Box>
              )}
              <Button variant="outlined" size="small" fullWidth>{SALON_DETAIL.EDIT_SCHEDULE}</Button>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
