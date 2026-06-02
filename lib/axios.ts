import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import { AUTH_REFRESH_ENDPOINT } from '@/constants'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Serialise array params as repeated keys (staffIds=a&staffIds=b) instead of
  // the bracketed staffIds[]=a form, which the API's query DTO rejects.
  paramsSerializer: { indexes: null },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let pendingQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null) {
  pendingQueue.forEach((p) => {
    if (token) p.resolve(token)
    else p.reject(error)
  })
  pendingQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    // Only attempt refresh on 401, not on login/refresh endpoints themselves
    if (status !== 401 || originalRequest._retry || originalRequest.url === AUTH_REFRESH_ENDPOINT) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        pendingQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    const { refreshToken, updateTokens, logout } = useAuthStore.getState()

    if (!refreshToken) {
      isRefreshing = false
      logout()
      if (typeof window !== 'undefined') window.location.href = '/login'
      return Promise.reject(error)
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${AUTH_REFRESH_ENDPOINT}`,
        { refreshToken },
      )
      const { accessToken, refreshToken: newRefreshToken } = res.data.data
      updateTokens(accessToken, newRefreshToken)
      processQueue(null, accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      logout()
      if (typeof window !== 'undefined') window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default api
