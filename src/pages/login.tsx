import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../lib/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((s) => s.login)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        .response?.data?.error ?? 'Login failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">✂️</span>
          <h1 className="text-2xl font-semibold mt-3 text-[#1A1A18]">BarberApp Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Salon owner & admin portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#F4F3EE] border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1A1A18] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A1A18]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F4F3EE] border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1A1A18] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A1A18]"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#1A1A18] text-white rounded-lg py-3 text-sm font-semibold disabled:opacity-50 hover:bg-[#2d2d2a] transition-colors"
          >
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>
      </div>
    </div>
  )
}
