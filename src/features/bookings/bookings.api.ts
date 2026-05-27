import api from '@/shared/api/client';
import { API_ROUTES } from '@/constants';
import type { Booking, PaginatedResponse } from '@/types';

export interface BookingFilters {
  salonId?: string;
  status?: string;
  limit?: number;
  page?: number;
}

export const bookingsApi = {
  list: async (filters: BookingFilters = {}): Promise<PaginatedResponse<Booking>> => {
    const params = new URLSearchParams();
    if (filters.salonId) params.set('salonId', filters.salonId);
    if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
    if (filters.limit) params.set('limit', String(filters.limit));
    if (filters.page) params.set('page', String(filters.page));
    const { data } = await api.get(`${API_ROUTES.BOOKINGS}?${params}`);
    return data;
  },

  complete: async (id: string): Promise<Booking> => {
    const { data } = await api.patch(API_ROUTES.BOOKING_COMPLETE(id));
    return data;
  },

  cancel: async (id: string): Promise<Booking> => {
    const { data } = await api.patch(API_ROUTES.BOOKING_CANCEL(id));
    return data;
  },
};
