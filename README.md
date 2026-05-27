# Barber Dashboard

Salon management dashboard built with Next.js, styled-components, and Zustand.

---

## Data Flow

```mermaid
flowchart TD
    API["Backend REST API"]

    subgraph SDK["src/sdk/"]
        authSdk["auth.ts"]
        salonsSdk["salons.ts"]
        bookingsSdk["bookings.ts"]
        queueSdk["queue.ts"]
    end

    subgraph LIB["src/lib/"]
        apiClient["api.ts\n(axios instance)"]
        authStore["authStore.ts\n(Zustand)"]
    end

    subgraph HOOKS["src/hooks/"]
        useSalonDetail["useSalonDetail.ts"]
    end

    subgraph PAGES["src/pages/"]
        login["login.tsx"]
        dashboard["dashboard.tsx"]
        bookings["bookings.tsx"]
        queue["queue.tsx"]
        salonDetail["salons/[id].tsx"]
    end

    API --> apiClient
    apiClient --> authSdk
    apiClient --> salonsSdk
    apiClient --> bookingsSdk
    apiClient --> queueSdk

    authSdk --> authStore
    authStore --> login
    authStore --> LIB

    salonsSdk --> dashboard
    bookingsSdk --> dashboard
    salonsSdk --> bookings
    bookingsSdk --> bookings
    salonsSdk --> queue
    queueSdk --> queue

    salonsSdk --> useSalonDetail
    bookingsSdk --> useSalonDetail
    queueSdk --> useSalonDetail
    useSalonDetail --> salonDetail
```

---

## Styling Architecture

```mermaid
flowchart TD
    theme["src/lib/theme.ts\nDesign tokens\n(colors, spacing, typography,\nradius, shadows, breakpoints)"]
    styledUtils["src/lib/styledUtils.ts\nnoForward helper\n(blocks custom props from DOM)"]
    globalStyle["src/lib/globalStyle.ts\nGlobal CSS reset + CSS vars\n+ keyframe animations"]
    document["src/pages/_document.tsx\nGoogle Fonts link tag\n(Playfair Display, DM Sans, Cairo)"]

    subgraph UI["src/components/ui/index.tsx — Primitives"]
        Button
        Badge
        Card
        Input
        Skeleton
        Spinner
        Avatar
        EmptyState
        StatValue
        IconBox
    end

    subgraph LAYOUTS["src/components/Layout.styles.ts"]
        Sidebar["Sidebar, Nav, TopBar\nBottomNav, Overlay"]
    end

    subgraph PAGE_STYLES["src/pages/*.styles.ts"]
        loginStyles["login.styles.ts"]
        dashStyles["dashboard.styles.ts"]
        bookStyles["bookings.styles.ts"]
        queueStyles["queue.styles.ts"]
        salonStyles["salons/[id].styles.ts"]
    end

    subgraph PAGES["src/pages/*.tsx"]
        Pages["login · dashboard · bookings\nqueue · salons/[id]"]
    end

    document -->|"loads font families"| theme
    theme --> globalStyle
    theme --> styledUtils
    theme --> UI
    theme --> LAYOUTS
    theme --> PAGE_STYLES

    styledUtils -->|"shouldForwardProp"| UI
    styledUtils -->|"shouldForwardProp"| LAYOUTS
    styledUtils -->|"shouldForwardProp"| PAGE_STYLES

    globalStyle -->|"injected via ThemeProvider\nin _app.tsx"| PAGES
    UI --> PAGES
    LAYOUTS --> PAGES
    PAGE_STYLES --> PAGES
```

---

## Constants Flow

```mermaid
flowchart LR
    subgraph CONSTANTS["src/constants/"]
        routes["routes.ts\nROUTES\n(all page paths)"]
        text["text.ts\nBRAND · LOGIN · PAGE_TITLES\nDASHBOARD · QUEUE_STRINGS\nBOOKINGS_STRINGS · COMMON\nSALON_DETAIL · STAFF_PAGE\nGREETINGS · DAY_NAMES\nSALON_TABS · TEST_ACCOUNTS"]
        nav["nav.ts\nNAV · BOTTOM_NAV\n(uses ROUTES)"]
        status["status.ts\nBOOKING_STATUS_BADGE\nQUEUE_STATUS_BADGE\nBOOKING_STATUSES\nACTIVE_QUEUE_STATUSES"]
        storage["storage.ts\nSTORAGE_KEYS\n(accessToken · refreshToken)"]
        apiRoutes["api.ts\nAPI_ROUTES\n(all endpoint paths)"]
        dashConst["dashboard.ts\nSTATS\n(uses theme colors)"]
    end

    routes --> layout["Layout.tsx"]
    routes --> pages["All pages"]
    routes --> index["index.tsx (redirect)"]

    text --> login["login.tsx"]
    text --> dashboard["dashboard.tsx"]
    text --> bookings["bookings.tsx"]
    text --> queue["queue.tsx"]
    text --> salonDetail["salons/[id].tsx"]
    text --> staffEtc["staff · services\nreviews · analytics\nclients"]

    nav --> layout

    status --> dashboard
    status --> bookings
    status --> queue
    status --> salonDetail
    status --> useSalonDetail["hooks/useSalonDetail.ts"]

    storage --> authStore["lib/authStore.ts"]

    apiRoutes --> authSdk["sdk/auth.ts"]
    apiRoutes --> salonsSdk["sdk/salons.ts"]
    apiRoutes --> bookingsSdk["sdk/bookings.ts"]
    apiRoutes --> queueSdk["sdk/queue.ts"]

    dashConst --> dashboard
```

---

## Project Structure

```
src/
├── constants/
│   ├── index.ts          barrel export
│   ├── routes.ts         page route paths
│   ├── text.ts           all UI strings & labels
│   ├── nav.ts            sidebar & bottom nav arrays
│   ├── status.ts         badge maps & status filter lists
│   ├── storage.ts        localStorage key names
│   ├── api.ts            API endpoint paths
│   └── dashboard.ts      stat card definitions (uses theme)
│
├── lib/
│   ├── api.ts            axios instance (base URL + auth header)
│   ├── authStore.ts      Zustand auth state (login/logout/hydrate)
│   ├── globalStyle.ts    CSS reset + custom properties + keyframes
│   ├── styledUtils.ts    noForward() — blocks custom props from DOM
│   ├── theme.ts          design tokens (colors, spacing, typography…)
│   └── types.ts          shared TypeScript types
│
├── sdk/
│   ├── index.ts          barrel export
│   ├── auth.ts           login · logout · me
│   ├── salons.ts         list · getById · getQueue
│   ├── bookings.ts       list · complete · cancel
│   └── queue.ts          callNext · serve · done · leave
│
├── hooks/
│   └── useSalonDetail.ts fetches salon + bookings + live queue
│
├── components/
│   ├── Layout.tsx         sidebar · topbar · bottom nav · auth guard
│   ├── Layout.styles.ts   styled-components for layout shell
│   └── ui/
│       └── index.tsx      Button · Badge · Card · Input · Skeleton
│                          Spinner · Avatar · EmptyState · IconBox…
│
└── pages/
    ├── _app.tsx            ThemeProvider + GlobalStyle
    ├── _document.tsx       font <link> + SSR style sheet
    ├── index.tsx           redirects → /dashboard
    ├── login.tsx
    ├── dashboard.tsx
    ├── bookings.tsx
    ├── queue.tsx
    ├── staff.tsx
    ├── services.tsx
    ├── reviews.tsx
    ├── analytics.tsx
    ├── clients.tsx
    └── salons/
        └── [id].tsx        overview · services · staff · bookings · queue tabs
```

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Styling | styled-components 6 |
| State | Zustand 4 |
| HTTP | Axios |
| Language | TypeScript (strict) |
| Fonts | Playfair Display · DM Sans · Cairo |
