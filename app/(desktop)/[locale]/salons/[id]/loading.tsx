import { Skeleton, Box } from '@mui/material';
import { styles } from './loading.styles';

export default function SalonLoading() {
  return (
    <Box sx={styles.container}>
      <Skeleton variant="text" height={36} width={280} />
      <Skeleton variant="text" height={16} width={400} />
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Skeleton variant="rounded" height={40} width={100} />
        <Skeleton variant="rounded" height={40} width={100} />
        <Skeleton variant="rounded" height={40} width={100} />
      </Box>
      <Skeleton variant="rounded" height={300} />
    </Box>
  );
}
