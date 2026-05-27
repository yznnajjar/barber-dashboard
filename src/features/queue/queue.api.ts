import api from '@/shared/api/client';
import { API_ROUTES } from '@/constants';

export const queueApi = {
  callNext: async (salonId: string): Promise<void> => {
    await api.post(API_ROUTES.QUEUE_CALL_NEXT(salonId), {});
  },

  serve: async (entryId: string): Promise<void> => {
    await api.post(API_ROUTES.QUEUE_SERVE(entryId));
  },

  done: async (entryId: string): Promise<void> => {
    await api.post(API_ROUTES.QUEUE_DONE(entryId));
  },

  leave: async (entryId: string): Promise<void> => {
    await api.delete(API_ROUTES.QUEUE_LEAVE(entryId));
  },
};
