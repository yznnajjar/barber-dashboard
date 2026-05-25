import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthStore } from '../lib/authStore'
import { PWAInstallBanner } from './PWAInstallBanner'
import { MobileBottomNav } from './MobileBottomNav'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  backHref?: string
  action?: React.ReactNode
}

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { label: 'Calendar', icon: '📅', href: '/calendar' },
  { label: 'Queue', icon: '🎫', href: '/queue' },
  { label: 'Clients', icon: '👥', href: '/clients' },
  { label: 'Analytics', icon: '📊', href: '/analytics' },
]

export function Layout({ children, title, backHref, action }: LayoutProps) {
  const { user, isAuthenticated, loadStoredAuth, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => { loadStoredAuth() }, [])

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-200 flex-col z-40">
        {/* Brand */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✂️</span>
            <div>
              <div className="font-bold text-sm text-[#1A1A18]">BarberApp</div>
              <div className="text-xs text-gray-400">Salon Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href ||
              (item.href !== '/dashboard' && router.pathname.startsWith(item.href))
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1A1A18] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
              {user?.fullName?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#1A1A18] truncate">{user?.fullName}</div>
              <div className="text-xs text-gray-400 truncate">{user?.email}</div>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-red-500 text-xs" title="Logout">
              ⎋
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="md:ml-56">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            {backHref ? (
              <button onClick={() => router.push(backHref)} className="text-gray-600 mr-1">
                ←
              </button>
            ) : null}
            <span className="text-lg">✂️</span>
            <span className="font-semibold text-sm text-[#1A1A18]">
              {title || 'BarberApp'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {action}
            <button onClick={logout} className="text-xs text-red-500 font-medium">
              Logout
            </button>
          </div>
        </div>

        {/* Desktop page header */}
        {title && (
          <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              {backHref && (
                <button
                  onClick={() => router.push(backHref)}
                  className="text-sm text-gray-500 hover:text-gray-800 mr-2"
                >
                  ← Back
                </button>
              )}
              <h1 className="font-semibold text-[#1A1A18]">{title}</h1>
            </div>
            {action && <div>{action}</div>}
          </div>
        )}

        {/* Page content */}
        <div className="p-4 md:p-6 pb-24 md:pb-6">
          <PWAInstallBanner />
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  )
}
