import type { BookingFilters } from '@/features/bookings/bookings.api';

export const queryKeys = {
  salons: {
    all: ['salons'] as const,
    list: () => [...queryKeys.salons.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.salons.all, 'detail', id] as const,
    queue: (salonId: string) => [...queryKeys.salons.all, 'queue', salonId] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    list: (filters: BookingFilters) => [...queryKeys.bookings.all, 'list', filters] as const,
  },
};
