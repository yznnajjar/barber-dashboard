import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queueApi } from './queue.api';
import { queryKeys } from '@/features/query-keys';

export function useQueueMutations(salonId: string) {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: queryKeys.salons.queue(salonId) });

  const callNext = useMutation({
    mutationFn: () => queueApi.callNext(salonId),
    onSuccess: invalidate,
  });

  const serve = useMutation({
    mutationFn: (entryId: string) => queueApi.serve(entryId),
    onSuccess: invalidate,
  });

  const done = useMutation({
    mutationFn: (entryId: string) => queueApi.done(entryId),
    onSuccess: invalidate,
  });

  const leave = useMutation({
    mutationFn: (entryId: string) => queueApi.leave(entryId),
    onSuccess: invalidate,
  });

  return { callNext, serve, done, leave };
}
