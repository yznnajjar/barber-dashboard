import api from '@/shared/api/client';
import { API_ROUTES } from '@/constants';
import type { User } from '@/types';

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const { data } = await api.post(API_ROUTES.AUTH_LOGIN, { email, password });
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post(API_ROUTES.AUTH_LOGOUT, {});
  },

  me: async (): Promise<User> => {
    const { data } = await api.get(API_ROUTES.AUTH_ME);
    return data;
  },
};
