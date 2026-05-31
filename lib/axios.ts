import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

// Real HTTP client per CLAUDE-code.md §6. The bundled mock layer (lib/mockApi.ts)
// is used by the query hooks today; swap a hook's mock call for `api.get(...)` to go live.
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
