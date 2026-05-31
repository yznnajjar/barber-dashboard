# barber-dashboard

Salon-owner dashboard — **Next.js 14 (App Router) · MUI v5 · Styled Components · React Query v5 · Zustand · next-intl (EN/AR) · TypeScript strict**, built to the `CLAUDE-code.md` standard and styled to match `Barber.html`.

It runs entirely on a **bundled mock-data layer** — no backend required.

## Run it

```bash
npm install
cp .env.local.example .env.local   # optional; mock layer works without it
npm run dev
```

Open http://localhost:3000 → you'll land on `/en/login`.
**Demo login:** any email + password works (pre-filled). Click **Sign in**.

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`, `npm run lint`.

## What's included

Login + all 7 desktop pages, each matching the design spec:

| Route | Page | Highlights |
|-------|------|-----------|
| `/[locale]/dashboard` | Overview | 4 stat cards w/ trends, upcoming appts, activity feed |
| `/[locale]/calendar` | Calendar | Day/week toggle, staff-column time grid, status-coloured blocks, current-time line, detail drawer |
| `/[locale]/queue` | Live Queue | Playfair hero position, **Call Next** (re-indexes queue), waiting list |
| `/[locale]/services` | Services | Table, active `Switch` toggle, add/edit drawer |
| `/[locale]/staff` | Staff | Card grid, profile drawer w/ working hours + assigned services |
| `/[locale]/analytics` | Analytics | Period tabs, revenue line chart (recharts), busy-hours heatmap, top services/clients |
| `/[locale]/clients` | Clients | Searchable DataGrid, profile drawer w/ history + notes |

Both `en` and `ar` (RTL) locales are wired via next-intl; switch with the globe icon in the header.


## Every action is wired (mock-persisted)

All actions update the React Query cache and re-render immediately:

- **Login** — two-panel `auth-shell` (brand panel + form), EN/AR toggle, password show/hide, empty-field validation, Google button (demo).
- **Header search** — opens a ⌘K command palette (jump to any page or client).
- **Dashboard** — *Add Booking* opens the booking drawer; *Open Queue* navigates.
- **Calendar** — Day **and** Week views; prev/next/today navigation; *Add Appointment* (service auto-sets duration → end time); appointment drawer with **Reschedule** (time picker) and **Cancel**; **drag-and-drop to reschedule** (powered by `@dnd-kit`) — drag a block vertically to change its time (snaps to 15 min) or into another staff column (day view) / day column (week view), with a live drag preview and a confirmation toast. Cancelled bookings aren't draggable.
- **Services** — add/edit drawer persists; active **Switch** toggles; **Delete** asks for confirmation first.
- **Staff** — profile drawer edits name/role, **toggles each working day + start/end time pickers**, and **assigned-services checklist**; Save persists. *Add Staff* creates a blank member.
- **Clients** — search; row → profile drawer; **notes autosave on blur** with a "Saved" indicator.
- **Queue** — *Call Next* advances and re-indexes; each waiting card can be removed.

## How the mock layer works (and going live)

- Static data: `lib/mockData.ts`
- Async API simulation (adds latency so React Query loading/skeleton states are real): `lib/mockApi.ts`
- Query hooks in `hooks/queries/` call `mockApi.*`

To switch a resource to the real API, change one line in its hook, e.g. in `hooks/queries/useBookings.ts`:

```ts
// from
queryFn: () => mockApi.getBookings(),
// to
queryFn: async () => (await api.get(`/api/bookings?salonId=${salonId}`)).data,
```

`lib/axios.ts` (with the JWT interceptor) and `lib/socket.ts` (queue real-time) are already in place per the standard.

## Structure

Follows `CLAUDE-code.md §13` exactly: `app/[locale]/(auth|dashboard)`, `components/{layout,shared,<feature>}` with `.styled.ts` companions, `hooks/{queries,mutations}`, `lib/`, `store/`, `types/`, `constants/`, `messages/`.

## Not included yet (clear next step)

- The 4 PWA / `mweb` pages (Dashboard, Queue, Bookings, Profile) + `BottomNav`/`TopBar`
- Signup & forgot-password flows (login is built; these were in unprovided `.jsx` files)
- Live Socket.io wiring (mock Call-Next simulates `queue-updated`)
