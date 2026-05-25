import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../lib/authStore'
import { Layout } from '../components/Layout'
import { api } from '../lib/api'
import type { Salon, Booking } from '../lib/types'

const STATUS_COLOR: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  NO_SHOW: 'bg-gray-100 text-gray-500',
}

export default function DashboardPage() {
  const { user, isAuthenticated, loadStoredAuth, logout } = useAuthStore()
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadStoredAuth()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return }
    api.get('/api/salons').then(({ data }) => setSalons(data.salons)).finally(() => setLoading(false))
  }, [isAuthenticated])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading dashboard…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✂️</span>
          <span className="font-semibold text-[#1A1A18]">BarberApp</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.fullName}</span>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">Log out</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A18]">Welcome back, {user?.fullName?.split(' ')[0]} 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">Here's an overview of your salons</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total salons', value: salons.length, icon: '🏪' },
            { label: 'Active salons', value: salons.filter(s => s.status === 'ACTIVE').length, icon: '✅' },
            { label: 'Total services', value: salons.reduce((sum, s) => sum + (s.services?.length ?? 0), 0), icon: '✂️' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-semibold text-[#1A1A18]">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Salons list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-[#1A1A18]">Your salons</h2>
            <button className="text-sm bg-[#1A1A18] text-white px-4 py-2 rounded-lg hover:bg-[#2d2d2a] transition-colors">
              + Add salon
            </button>
          </div>

          {salons.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
              <div className="text-4xl mb-3">✂️</div>
              <p className="text-gray-500 text-sm">No salons yet. Add your first salon to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {salons.map((salon) => (
                <div key={salon.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A18]">{salon.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{salon.address}, {salon.city}</div>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        salon.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                        salon.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {salon.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {salon.genderType}
                      </span>
                      {salon.walkInEnabled && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Walk-in</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => router.push(`/salons/${salon.id}`)}>
                      Manage →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phase placeholders */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '📅', title: 'Appointments', desc: 'Manage bookings — Phase 4', soon: true },
            { icon: '🎫', title: 'Live Queue', desc: 'Walk-in queue view — Phase 5', soon: true },
            { icon: '💳', title: 'Payments', desc: 'Revenue & payouts — Phase 6', soon: true },
            { icon: '⭐', title: 'Reviews', desc: 'Customer feedback — Phase 6', soon: true },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl border border-dashed border-gray-200 p-5 opacity-60">
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="font-medium text-sm text-[#1A1A18]">{card.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
