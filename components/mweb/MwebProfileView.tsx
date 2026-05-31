'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@mui/material'
import LogoutRounded from '@mui/icons-material/LogoutRounded'
import LanguageRounded from '@mui/icons-material/LanguageRounded'
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded'
import StorefrontRounded from '@mui/icons-material/StorefrontRounded'
import NotificationsRounded from '@mui/icons-material/NotificationsRounded'
import { useAuthStore } from '@/store/authStore'
import { useMwebRouter } from '@/hooks/shared/useMwebRouter'
import { ROUTE_MWEB_LOGIN, ROUTE_MWEB_PROFILE, LOCALE_EN, LOCALE_AR } from '@/constants'
import UserAvatar from '@/components/shared/UserAvatar'
import { RowList } from './MwebDashboardView.styled'
import styled from 'styled-components'
import { COLORS } from '@/lib/colors'

const ProfileHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 12px 0 4px;

  .name { font-size: 20px; font-weight: 700; }
  .role { font-size: 13px; color: ${COLORS.ink60}; }
`
const Icon = styled.span`
  width: 34px; height: 34px; border-radius: 9px;
  background: ${COLORS.prince20};
  color: ${COLORS.prince};
  display: grid; place-items: center;
  flex-shrink: 0;
`

export default function MwebProfileView() {
  const tn = useTranslations('nav')
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { locale, replace, switchLocale } = useMwebRouter()

  const nextLocale = locale === LOCALE_AR ? LOCALE_EN : LOCALE_AR

  const onLogout = () => { logout(); replace(ROUTE_MWEB_LOGIN) }

  return (
    <>
      <ProfileHead>
        <UserAvatar name={user?.name ?? 'Salon Owner'} color={6} size="xxl" />
        <div>
          <div className="name">{user?.name ?? 'Yousef Najjar'}</div>
          <div className="role">Salon Owner · Najjar Cuts</div>
        </div>
      </ProfileHead>

      <RowList>
        <div className="item" style={{ cursor: 'default' }}>
          <Icon><StorefrontRounded sx={{ fontSize: 19 }} /></Icon>
          <div className="grow">
            <div className="name">Najjar Cuts</div>
            <div className="svc">Amman, Jordan</div>
          </div>
        </div>
        <div className="item" style={{ cursor: 'default' }}>
          <Icon><NotificationsRounded sx={{ fontSize: 19 }} /></Icon>
          <div className="grow"><div className="name">Notifications</div></div>
          <ChevronRightRounded sx={{ color: COLORS.ink40 }} />
        </div>
        <div className="item" onClick={() => switchLocale(nextLocale, ROUTE_MWEB_PROFILE)}>
          <Icon><LanguageRounded sx={{ fontSize: 19 }} /></Icon>
          <div className="grow">
            <div className="name">Language</div>
            <div className="svc">{locale === LOCALE_AR ? 'العربية' : 'English'}</div>
          </div>
          <ChevronRightRounded sx={{ color: COLORS.ink40 }} />
        </div>
      </RowList>

      <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<LogoutRounded />}
        onClick={onLogout}
        sx={{ height: 52, mt: 1 }}
      >
        {tn('logout')}
      </Button>
    </>
  )
}
