import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '../../lib/api'
import { useAuthStore } from '../../lib/authStore'
import type { Salon, Service, StaffMember, Booking } from '../../lib/types'

type Tab = 'overview' | 'services' | 'staff' | 'bookings' | 'queue'

const STATUS_COLOR: Record<string, string> = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
  NO_SHOW:   'bg-red-100 text-red-500',
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
}

export default function SalonManagePage() {
  const router = useRouter()
  const { id } = router.query
  const { loadStoredAuth, isAuthenticated, logout } = useAuthStore()

  const [salon, setSalon] = useState<Salon | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [queue, setQueue] = useState<{ queueLength: number; entries: { id: string; position: number; customerName: string; status: string }[] } | null>(null)
  const [tab, setTab] = useState<Tab>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadStoredAuth() }, [])

  useEffect(() => {
    if (!isAuthenticated || !id) return
    Promise.all([
      api.get(`/api/salons/${id}`),
      api.get('/api/services', { params: { salonId: id } }),
      api.get('/api/staff', { params: { salonId: id } }),
      api.get('/api/bookings', { params: { salonId: id } }),
    ]).then(([s, svc, stf, bk]) => {
      setSalon(s.data.salon)
      setServices(svc.data.services)
      setStaff(stf.data.staff)
      setBookings(bk.data.bookings)
    }).finally(() => setLoading(false))
  }, [isAuthenticated, id])

  useEffect(() => {
    if (tab === 'queue' && id) {
      api.get(`/api/queue/${id}`).then(({ data }) => setQueue(data)).catch(() => setQueue(null))
      const i = setInterval(() => {
        api.get(`/api/queue/${id}`).then(({ data }) => setQueue(data)).catch(() => {})
      }, 10_000)
      return () => clearInterval(i)
    }
  }, [tab, id])

  async function callNext() {
    try {
      const { data } = await api.post(`/api/queue/${id}/call-next`)
      alert(`Called: ${data.customer.fullName}`)
      const qRes = await api.get(`/api/queue/${id}`)
      setQueue(qRes.data)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } }).response?.data?.error ?? 'Error'
      alert(msg)
    }
  }

  async function markComplete(bookingId: string) {
    if (!confirm('Mark this booking as completed?')) return
    await api.patch(`/api/bookings/${bookingId}/complete`)
    setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: 'COMPLETED' } : b))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading salon…</div>
      </div>
    )
  }

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: '🏪' },
    { key: 'services', label: `Services (${services.length})`, icon: '✂️' },
    { key: 'staff', label: `Staff (${staff.length})`, icon: '👥' },
    { key: 'bookings', label: `Bookings (${bookings.length})`, icon: '📅' },
    { key: 'queue', label: `Live Queue${queue ? ` (${queue.queueLength})` : ''}`, icon: '🎫' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-gray-800">← Dashboard</button>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#1A1A18]">{salon?.name}</span>
        </div>
        <button onClick={logout} className="text-sm text-red-600 hover:underline">Log out</button>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === t.key
                  ? 'bg-[#1A1A18] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && salon && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <h2 className="font-semibold text-[#1A1A18]">Salon details</h2>
              {[
                { l: 'Name', v: salon.name },
                { l: 'Address', v: `${salon.address}, ${salon.city}` },
                { l: 'Gender', v: salon.genderType },
                { l: 'Walk-ins', v: salon.walkInEnabled ? 'Enabled' : 'Disabled' },
                { l: 'Status', v: salon.status.replace('_', ' ') },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-500">{l}</span>
                  <span className="font-medium text-[#1A1A18]">{v}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Services', value: services.length, icon: '✂️' },
                { label: 'Staff', value: staff.length, icon: '👥' },
                { label: 'Total bookings', value: bookings.length, icon: '📅' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-semibold text-[#1A1A18]">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {tab === 'services' && (
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-[#1A1A18]">{s.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.durationMin} min · {s.genderTarget}</div>
                </div>
                <div className="text-base font-semibold text-[#1A1A18]">${parseFloat(s.price).toFixed(0)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Staff */}
        {tab === 'staff' && (
          <div className="grid grid-cols-2 gap-4">
            {staff.map((m) => (
              <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-600">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm text-[#1A1A18]">{m.name}</div>
                  {m.specialty && <div className="text-xs text-gray-500">{m.specialty}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings */}
        {tab === 'bookings' && (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm text-[#1A1A18]">{b.customer?.fullName ?? 'Customer'}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{b.service?.name} · {formatDate(b.scheduledAt)}</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-semibold text-[#1A1A18]">${parseFloat(b.service?.price ?? '0').toFixed(0)}</span>
                  {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => markComplete(b.id)}
                      className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Mark complete ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="text-center text-gray-400 py-10 text-sm">No bookings yet</div>
            )}
          </div>
        )}

        {/* Queue */}
        {tab === 'queue' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-semibold text-[#1A1A18]">{queue?.queueLength ?? 0}</div>
                  <div className="text-sm text-gray-500">people waiting</div>
                </div>
                <button
                  onClick={callNext}
                  className="bg-[#1A1A18] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2d2d2a] transition-colors"
                >
                  Call next →
                </button>
              </div>

              <div className="space-y-2">
                {queue?.entries?.map((e) => (
                  <div key={e.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                      {e.position}
                    </div>
                    <div className="flex-1 text-sm text-[#1A1A18]">{e.customerName}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${e.status === 'CALLED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {e.status}
                    </span>
                  </div>
                ))}
                {(!queue || queue.queueLength === 0) && (
                  <div className="text-center text-gray-400 py-6 text-sm">Queue is empty</div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">Auto-refreshes every 10 seconds</p>
          </div>
        )}
      </div>
    </div>
  )
}
