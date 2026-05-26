import { create } from 'zustand';
import { User } from './types';
import api from './api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isHydrated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isHydrated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', data.token);
      set({ user: data.user, accessToken: data.token, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout', {});
    } catch {}
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null });
  },

  hydrate: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({ isHydrated: true });
      return;
    }
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data, accessToken: token, isHydrated: true });
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ user: null, accessToken: null, isHydrated: true });
    }
  },

  setUser: (user) => set({ user }),
}));
