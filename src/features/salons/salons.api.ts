import api from '@/shared/api/client';
import { API_ROUTES } from '@/constants';
import type { Salon, QueueEntry, PaginatedResponse } from '@/types';

export const salonsApi = {
  list: async (limit = 50): Promise<PaginatedResponse<Salon>> => {
    const { data } = await api.get(`${API_ROUTES.SALONS}?limit=${limit}`);
    return data;
  },

  getById: async (id: string): Promise<Salon> => {
    const { data } = await api.get(API_ROUTES.SALON_BY_ID(id));
    return data;
  },

  getQueue: async (salonId: string): Promise<QueueEntry[]> => {
    const { data } = await api.get(API_ROUTES.SALON_QUEUE(salonId));
    return data || [];
  },
};
