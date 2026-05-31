# Mobile Web (mweb) / PWA

Mobile-first experience alongside the desktop dashboard, sharing the same data
layer, types, theme, and shared components. Built to the `.pwa-*` design
language from `Barber.html`.

## URL shape (per CLAUDE-code.md §13 + product decision)

`mweb` is a **top-level** segment, OUTSIDE the desktop `/[locale]` tree. The
locale travels as a **`?lang=`** query param, not a path segment:

```
Desktop   /en/login        /en/dashboard      (locale = path segment, next-intl)
mweb      /mweb/login?lang=en   /mweb/dashboard?lang=en   (locale = query param)
```

## Structure

```
app/
  [locale]/                      # desktop (next-intl path locale) — unchanged
  mweb/                          # mweb — top-level, locale via ?lang=
    layout.tsx                   # static <html>; delegates locale to client provider
    page.tsx                     # /mweb -> /mweb/dashboard?lang=… (redirect)
    (auth)/login/page.tsx        # /mweb/login
    (dashboard)/
      layout.tsx                 # wraps in MwebShell, derives title from path
      dashboard|queue|bookings|profile/page.tsx

components/layout/mweb/
  MwebIntlProvider.tsx           # reads ?lang=, sets <html dir/lang>, supplies messages
  MwebShell.tsx                  # topbar + bottom nav + safe-area chrome
  MwebShell.styled.ts            # .pwa-* design classes as styled-components (COLORS)
  MwebBottomNav.tsx              # 4-tab nav; hrefs carry ?lang=
  MwebAuthGate.tsx               # guards mweb pages -> /mweb/login?lang=
  ResponsiveGuard.tsx            # viewport <-> route-family sync (both directions)

components/mweb/                 # screen views, reuse existing hooks/components
  MwebLoginView, MwebDashboardView, MwebQueueView, MwebQueueRow,
  MwebActionSheet, MwebBookingsView, MwebProfileView (+ .styled.ts)

hooks/shared/
  useMediaQuery.ts               # SSR-safe media query + useIsMobile
  useMwebRouter.ts               # navigation that keeps ?lang= sticky
lib/mwebNav.ts                   # mwebHref(path, locale), normalizeLocale, dirForLocale
public/manifest.json             # start_url: /mweb/dashboard?lang=en
```

## Why a client locale provider (not the layout)

Next.js App-Router **layouts do not receive `searchParams`** and don't re-render
on query change. So the mweb root layout renders a static `<html>`, and
`MwebIntlProvider` (client, under `<Suspense>`) reads `?lang=`, swaps the
`NextIntlClientProvider` messages, and sets `<html lang/dir>`. Both locale
message bundles are bundled (they're small JSON).

## Reuse — nothing forked unnecessarily

mweb screens consume the **same** hooks (`useDashboardStats`, `useBookings`,
`useQueue`, `useCallNext`, `useRemoveFromQueue`), the same `types`,
`lib/colors`, `lib/utils`, `store/authStore`, the same i18n message namespaces,
and the same shared presentational components (`StatCard`, `StatusChip`,
`UserAvatar`, `EmptyState`, `ErrorState`). Only chrome + interactions are
platform-specific (bottom-nav vs sidebar, bottom-sheet vs drawer, swipe vs
hover) — the genuinely structural differences.

## Device handoff (the redirect)

1. **`ResponsiveGuard`** (client): on the desktop shell it sends phone viewports
   from `/<locale>/<route>` -> `/mweb/<route>?lang=<locale>`; on the mweb shell
   it sends desktop viewports back to `/<locale>/<route>`. Writes a
   `barber-device` cookie.
2. **`middleware.ts`** (server): the mweb branch never runs next-intl
   locale-prefixing (mweb has no path locale). On the first request it uses the
   device cookie to redirect to the correct family — desktop -> mweb carries the
   locale into `?lang=`, mweb -> desktop lifts `?lang=` into the path segment.

Route pairing is declared once in `constants/index.ts`
(`DESKTOP_TO_MWEB` / `MWEB_TO_DESKTOP`).

## PWA install

`public/manifest.json` (`display: standalone`, `start_url:/mweb/dashboard?lang=en`).
Add icons at `public/icons/icon-192.png` and `icon-512.png`. For offline support
add a service worker (next-pwa / Serwist) — CLAUDE-code.md §1 lists next-pwa as a
barber-customer dependency; not wired here to avoid adding build tooling to
barber-dashboard.

## Verified
- `tsc --noEmit` — clean
- `next build` — compiles; routes: /mweb/login, /mweb/dashboard, /mweb/queue,
  /mweb/bookings, /mweb/profile (no [locale] segment) + desktop /[locale]/* intact
