import { create } from 'zustand';
import { User } from '@/types';
import { authApi } from './auth.api';
import { STORAGE_KEYS } from '@/constants';

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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isHydrated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user, token } = await authApi.login(email, password);
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      set({ user, accessToken: token, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {}
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    set({ user: null, accessToken: null });
  },

  hydrate: async () => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      set({ isHydrated: true });
      return;
    }
    try {
      const user = await authApi.me();
      set({ user, accessToken: token, isHydrated: true });
    } catch {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      set({ user: null, accessToken: null, isHydrated: true });
    }
  },

  setUser: (user) => set({ user }),
}));
