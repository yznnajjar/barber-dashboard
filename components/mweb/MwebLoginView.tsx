'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, CircularProgress } from '@mui/material'
import MailOutline from '@mui/icons-material/MailOutline'
import LockOutlined from '@mui/icons-material/LockOutlined'
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api'
import { useMwebRouter } from '@/hooks/shared/useMwebRouter'
import { ROUTE_MWEB_DASHBOARD, ROUTE_MWEB_LOGIN, LOCALE_EN, LOCALE_AR, DEFAULT_LOGIN_EMAIL, DEFAULT_LOGIN_PASSWORD } from '@/constants'
import type { Role } from '@/types'
import {
  LoginRoot, Brand, Hero, Field, InputWrap, ErrorMsg, LangToggle, Foot,
} from './MwebLoginView.styled'

export default function MwebLoginView() {
  const t = useTranslations('auth')
  const setAuth = useAuthStore((s) => s.setAuth)
  const { locale, replace, switchLocale } = useMwebRouter()

  const [email, setEmail] = useState(DEFAULT_LOGIN_EMAIL)
  const [password, setPassword] = useState(DEFAULT_LOGIN_PASSWORD)
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await authApi.login(email, password)
      setAuth(result.accessToken, result.refreshToken, {
        id: result.userId,
        name: email,
        email,
        role: result.role as Role,
        salonId: result.salonId,
      })
      replace(ROUTE_MWEB_DASHBOARD)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        || 'Invalid credentials. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginRoot>
      <LangToggle>
        <button className={locale === LOCALE_EN ? 'active' : ''} onClick={() => switchLocale(LOCALE_EN, ROUTE_MWEB_LOGIN)}>EN</button>
        <button className={locale === LOCALE_AR ? 'active' : ''} onClick={() => switchLocale(LOCALE_AR, ROUTE_MWEB_LOGIN)}>عربي</button>
      </LangToggle>

      <Brand>
        <span className="logo">B</span>
        <span className="name">Barber</span>
      </Brand>

      <Hero>
        <div className="kicker">Salon Owner</div>
        <h1>{t('welcome')}</h1>
        <p>{t('subtitle')}</p>
      </Hero>

      <Field>
        <span className="lbl">{t('email')}</span>
        <InputWrap $error={!!error && !email.trim()}>
          <span className="lead"><MailOutline sx={{ fontSize: 20 }} /></span>
          <input type="email" inputMode="email" value={email} placeholder="you@salon.jo"
            onChange={(e) => { setEmail(e.target.value); setError('') }} />
        </InputWrap>
      </Field>

      <Field>
        <span className="lbl">{t('password')}</span>
        <InputWrap $error={!!error && !password.trim()}>
          <span className="lead"><LockOutlined sx={{ fontSize: 20 }} /></span>
          <input type={showPwd ? 'text' : 'password'} value={password} placeholder="••••••••"
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && submit()} />
          <button type="button" className="tail" onClick={() => setShowPwd((v) => !v)}>{showPwd ? 'Hide' : 'Show'}</button>
        </InputWrap>
      </Field>

      {error && <ErrorMsg><ErrorOutlineRounded sx={{ fontSize: 16 }} />{error}</ErrorMsg>}

      <Button fullWidth variant="contained" onClick={submit} disabled={loading} sx={{ height: 52, borderRadius: '12px', fontSize: 15, mt: 1 }}>
        {loading ? <CircularProgress size={22} color="inherit" /> : t('signIn')}
      </Button>

      <Foot>{t('demoHint')}</Foot>
    </LoginRoot>
  )
}
