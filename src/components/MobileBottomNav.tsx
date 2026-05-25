import { useRouter } from 'next/router'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { label: 'Calendar', icon: '📅', href: '/calendar' },
  { label: 'Queue', icon: '🎫', href: '/queue' },
  { label: 'Clients', icon: '👥', href: '/clients' },
  { label: 'Analytics', icon: '📊', href: '/analytics' },
]

export function MobileBottomNav() {
  const router = useRouter()

  // Only show in PWA standalone mode or narrow screens
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-stretch z-50 md:hidden safe-area-inset-bottom">
      {NAV_ITEMS.map((item) => {
        const isActive = router.pathname === item.href ||
          (item.href !== '/dashboard' && router.pathname.startsWith(item.href))
        return (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 transition-colors ${
              isActive ? 'text-[#1A1A18]' : 'text-gray-400'
            }`}
          >
            <span className={`text-xl leading-none ${isActive ? 'opacity-100' : 'opacity-50'}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] font-medium leading-none mt-1 ${
              isActive ? 'text-[#1A1A18]' : 'text-gray-400'
            }`}>
              {item.label}
            </span>
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-[#1A1A18] mt-0.5" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
