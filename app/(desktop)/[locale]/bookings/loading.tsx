import { Skeleton, Box } from '@mui/material';
import { styles } from './loading.styles';

export default function BookingsLoading() {
  return (
    <Box sx={styles.container}>
      <Skeleton variant="text" height={32} width={200} />
      <Skeleton variant="text" height={16} width={140} />
      <Box sx={styles.filterRow}>
        <Skeleton variant="rounded" height={36} width={280} />
        <Skeleton variant="rounded" height={36} width={80} />
        <Skeleton variant="rounded" height={36} width={80} />
      </Box>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={52} />
      ))}
    </Box>
  );
}
