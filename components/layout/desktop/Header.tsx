'use client'
import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { IconButton, Box, Badge } from '@mui/material'
import SearchRounded from '@mui/icons-material/SearchRounded'
import NotificationsNoneRounded from '@mui/icons-material/NotificationsNoneRounded'
import LanguageRounded from '@mui/icons-material/LanguageRounded'
import LogoutRounded from '@mui/icons-material/LogoutRounded'
import { useAuthStore } from '@/store/authStore'
import { LOCALE_AR, LOCALE_EN, ROUTE_LOGIN } from '@/constants'
import { HeaderRoot, Crumbs, SearchBox } from './Header.styled'
import CommandModal from './CommandModal'

export default function Header({ title }: { title: string }) {
  const common = useTranslations('common')
  const nav = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const logout = useAuthStore((s) => s.logout)
  const [searchOpen, setSearchOpen] = useState(false)

  // ⌘K / Ctrl+K opens the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleLocale = () => {
    const next = locale === LOCALE_AR ? LOCALE_EN : LOCALE_AR
    router.replace(pathname, { locale: next })
  }

  const handleLogout = () => {
    logout()
    router.replace(ROUTE_LOGIN)
  }

  return (
    <>
      <HeaderRoot>
        <Crumbs>
          <span>Najjar Cuts</span>
          <span>/</span>
          <span className="current">{title}</span>
        </Crumbs>
        <Box sx={{ flex: 1 }} />
        <SearchBox role="button" tabIndex={0} onClick={() => setSearchOpen(true)} onKeyDown={(e) => e.key === 'Enter' && setSearchOpen(true)}>
          <SearchRounded sx={{ fontSize: 18 }} />
          <span style={{ flex: 1 }}>{common('search')}…</span>
          <kbd style={{ fontSize: 11, fontWeight: 700, opacity: 0.6 }}>⌘K</kbd>
        </SearchBox>
        <IconButton onClick={toggleLocale} title={locale === LOCALE_AR ? 'English' : 'العربية'}>
          <LanguageRounded />
        </IconButton>
        <IconButton title="Notifications">
          <Badge color="error" variant="dot"><NotificationsNoneRounded /></Badge>
        </IconButton>
        <IconButton onClick={handleLogout} title={nav('logout')}><LogoutRounded /></IconButton>
      </HeaderRoot>

      <CommandModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
