import { io } from 'socket.io-client'

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
// Backend WebSocket gateway is on the /queue namespace
export const queueSocket = io(`${baseUrl}/queue`, {
  autoConnect: false,
  auth: (cb) => {
    const token = (() => {
      try {
        const raw = localStorage.getItem('barber-auth')
        if (!raw) return null
        const parsed = JSON.parse(raw)
        return parsed?.state?.token || null
      } catch {
        return null
      }
    })()
    cb({ token })
  },
})
