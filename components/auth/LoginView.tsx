'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { Button, CircularProgress } from '@mui/material'
import MailOutline from '@mui/icons-material/MailOutline'
import LockOutlined from '@mui/icons-material/LockOutlined'
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api'
import { ROUTE_DASHBOARD, LOCALE_EN, LOCALE_AR, DEFAULT_LOGIN_EMAIL, DEFAULT_LOGIN_PASSWORD } from '@/constants'
import type { Role } from '@/types'
import {
  Shell, BrandPanel, FormPanel, LangToggle, Field, InputWrap, FieldError, OrDivider, SocialBtn,
  WelcomeTitle, WelcomeSubtitle, ForgotRow, TextLink, SocialStack, TestimonialAvatar,
} from './LoginView.styled'

export default function LoginView() {
  const t = useTranslations('auth')
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const setAuth = useAuthStore((s) => s.setAuth)

  const [email, setEmail] = useState(DEFAULT_LOGIN_EMAIL)
  const [password, setPassword] = useState(DEFAULT_LOGIN_PASSWORD)
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const setLocale = (next: string) => router.replace(pathname, { locale: next })

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
      router.replace(ROUTE_DASHBOARD)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        || 'Invalid credentials. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Shell>
      <BrandPanel>
        <div className="brand-top">
          <div className="brand-logo">B</div>
          <div className="brand-name">Barber</div>
        </div>

        <div className="brand-hero">
          <div className="kicker">Salon Owner Platform</div>
          <h1>Run your chair,<br /><em>not your books.</em></h1>
          <div className="tagline">
            Bookings, walk-in queue, staff schedules and daily revenue — one calm dashboard for your whole salon.
          </div>

          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <div className="quote">“We cut our no-shows in half and the queue runs itself now.”</div>
            <div className="who">
              <TestimonialAvatar>SO</TestimonialAvatar>
              <div>
                <div className="who-name">Sami Odeh</div>
                <div className="who-role">Owner · Downtown Fades, Amman</div>
              </div>
            </div>
          </div>
        </div>

        <div className="brand-foot">
          <span><span className="status-dot" />All systems operational</span>
          <span>·</span>
          <span>Amman · King Abdullah II St</span>
        </div>
      </BrandPanel>

      <FormPanel>
        <div className="top-row">
          <LangToggle>
            <button className={locale === LOCALE_EN ? 'active' : ''} onClick={() => setLocale(LOCALE_EN)}>EN</button>
            <button className={locale === LOCALE_AR ? 'active' : ''} onClick={() => setLocale(LOCALE_AR)}>عربي</button>
          </LangToggle>
        </div>

        <div className="form-card">
          <WelcomeTitle>{t('welcome')}</WelcomeTitle>
          <WelcomeSubtitle>{t('subtitle')}</WelcomeSubtitle>

          <Field>
            <label className="field-label">{t('email')}</label>
            <InputWrap $error={!!error && !email.trim()}>
              <span className="lead"><MailOutline sx={{ fontSize: 20 }} /></span>
              <input type="email" value={email} placeholder="you@salon.jo" onChange={(e) => { setEmail(e.target.value); setError('') }} />
            </InputWrap>
          </Field>

          <Field>
            <label className="field-label">{t('password')}</label>
            <InputWrap $error={!!error && !password.trim()}>
              <span className="lead"><LockOutlined sx={{ fontSize: 20 }} /></span>
              <input type={showPwd ? 'text' : 'password'} value={password} placeholder="••••••••" onChange={(e) => { setPassword(e.target.value); setError('') }} onKeyDown={(e) => e.key === 'Enter' && submit()} />
              <button type="button" className="tail-btn" onClick={() => setShowPwd((v) => !v)}>{showPwd ? 'Hide' : 'Show'}</button>
            </InputWrap>
          </Field>

          {error && <FieldError $mb><ErrorOutlineRounded sx={{ fontSize: 16 }} />{error}</FieldError>}

          <ForgotRow>
            <TextLink>{t('forgot')}</TextLink>
          </ForgotRow>

          <Button fullWidth variant="contained" onClick={submit} disabled={loading} sx={{ height: 50, borderRadius: '10px', fontSize: 15 }}>
            {loading ? <CircularProgress size={22} color="inherit" /> : t('signIn')}
          </Button>

          <OrDivider>or</OrDivider>

          <SocialStack>
            <SocialBtn type="button" onClick={submit}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"/></svg>
              Continue with Google
            </SocialBtn>
          </SocialStack>

          <div className="form-foot">{t('demoHint')}</div>
          <div className="form-foot" style={{ paddingTop: 8 }}>
            New salon? <TextLink>Contact your administrator</TextLink>
          </div>
        </div>
      </FormPanel>
    </Shell>
  )
}
