'use client'
import { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useMwebRouter } from '@/hooks/shared/useMwebRouter'
import { ROUTE_MWEB_PROFILE, SHELL_MWEB } from '@/constants'
import NotificationsRounded from '@mui/icons-material/NotificationsRounded'
import MwebAuthGate from './MwebAuthGate'
import UserAvatar from '@/components/shared/UserAvatar'
import MwebBottomNav from './MwebBottomNav'
import ResponsiveGuard from './ResponsiveGuard'
import RouteProgressBar from '@/components/shared/RouteProgressBar'
import { PwaRoot, PwaTopbar, PwaScreen } from './MwebShell.styled'

interface Props {
  title: string
  children: ReactNode
  trailing?: ReactNode
}

export default function MwebShell({ title, children, trailing }: Props) {
  const user = useAuthStore((s) => s.user)
  const { push } = useMwebRouter()

  return (
    <MwebAuthGate>
      <RouteProgressBar />
      <ResponsiveGuard target={SHELL_MWEB} />
      <PwaRoot>
        <PwaTopbar>
          <span className="title">{title}</span>
          {trailing ?? (
            <button className="trailing bell-dot" aria-label="Notifications">
              <NotificationsRounded />
            </button>
          )}
          <button
            onClick={() => push(ROUTE_MWEB_PROFILE)}
            style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
            aria-label="Profile"
          >
            <UserAvatar name={user?.name ?? 'Salon Owner'} color={6} size="md" />
          </button>
        </PwaTopbar>

        <PwaScreen>{children}</PwaScreen>

        <MwebBottomNav />
      </PwaRoot>
    </MwebAuthGate>
  )
}
