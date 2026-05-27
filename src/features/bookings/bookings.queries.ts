import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from './bookings.api';
import type { BookingFilters } from './bookings.api';
import { queryKeys } from '@/features/query-keys';

export function useBookings(filters: BookingFilters) {
  return useQuery({
    queryKey: queryKeys.bookings.list(filters),
    queryFn: () => bookingsApi.list(filters),
    enabled: !!filters.salonId,
  });
}

export function useBookingMutations() {
  const qc = useQueryClient();

  const complete = useMutation({
    mutationFn: (id: string) => bookingsApi.complete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.bookings.all }),
  });

  const cancel = useMutation({
    mutationFn: (id: string) => bookingsApi.cancel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.bookings.all }),
  });

  return { complete, cancel };
}
