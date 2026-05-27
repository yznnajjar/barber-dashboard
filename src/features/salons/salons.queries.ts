import { useQuery } from '@tanstack/react-query';
import { salonsApi } from './salons.api';
import { queryKeys } from '@/features/query-keys';

export function useSalons() {
  return useQuery({
    queryKey: queryKeys.salons.list(),
    queryFn: () => salonsApi.list(50),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSalonDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.salons.detail(id!),
    queryFn: () => salonsApi.getById(id!),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useQueue(salonId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.salons.queue(salonId!),
    queryFn: () => salonsApi.getQueue(salonId!),
    enabled: !!salonId,
    refetchInterval: 10_000,
  });
}
