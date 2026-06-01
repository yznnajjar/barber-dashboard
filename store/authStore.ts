import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: User | null
  salonId: string | null
  setAuth: (token: string, refreshToken: string, user: User) => void
  updateTokens: (token: string, refreshToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      salonId: null,
      setAuth: (token, refreshToken, user) =>
        set({ token, refreshToken, user, salonId: user.salonId }),
      updateTokens: (token, refreshToken) => set({ token, refreshToken }),
      logout: () => set({ token: null, refreshToken: null, user: null, salonId: null }),
    }),
    { name: 'barber-auth' },
  ),
)
