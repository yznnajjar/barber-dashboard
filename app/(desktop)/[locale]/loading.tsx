import { Skeleton, Box } from '@mui/material';
import { styles } from './loading.styles';

export default function DesktopLoading() {
  return (
    <Box sx={styles.container}>
      <Skeleton variant="text" height={36} width={280} />
      <Skeleton variant="text" height={16} width={420} />
      <Box sx={styles.statsGrid}>
        <Skeleton variant="rounded" height={100} />
        <Skeleton variant="rounded" height={100} />
        <Skeleton variant="rounded" height={100} />
        <Skeleton variant="rounded" height={100} />
      </Box>
      <Box sx={styles.chartGrid}>
        <Skeleton variant="rounded" height={300} />
        <Skeleton variant="rounded" height={300} />
      </Box>
    </Box>
  );
}
