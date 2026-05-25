// BarberApp Service Worker
// Handles: offline caching, background sync, push notifications

const CACHE_NAME = 'barber-app-v1'
const STATIC_CACHE = 'barber-static-v1'
const API_CACHE = 'barber-api-v1'

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/login',
  '/calendar',
  '/queue',
  '/offline',
  '/manifest.json',
]

// ── Install ────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// ── Activate ───────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// ── Fetch strategy ─────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // API calls: Network first, fall back to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Static assets: Cache first, fall back to network
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(cacheFirstStrategy(request))
    return
  }

  // Pages: Network first, fall back to cache, then offline page
  event.respondWith(pageStrategy(request))
})

// ── Strategies ─────────────────────────────────

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch {
    const cached = await caches.match(request)
    return cached || new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function cacheFirstStrategy(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(STATIC_CACHE)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch {
    return new Response('Asset not available offline', { status: 503 })
  }
}

async function pageStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(STATIC_CACHE)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    // Fall back to offline page
    return caches.match('/offline') || new Response('You are offline', { status: 503 })
  }
}

// ── Push notifications ─────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  const { title, body, icon, badge, data: notifData } = data

  const options = {
    body: body || '',
    icon: icon || '/icons/icon-192x192.png',
    badge: badge || '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: notifData || {},
    actions: notifData?.actions || [],
    tag: notifData?.tag || 'barber-notification',
    renotify: true,
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

// ── Notification click ─────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const { action, notification } = event
  const notifData = notification.data || {}

  let targetUrl = '/dashboard'

  if (action === 'view-queue' || notifData.type === 'NEW_QUEUE_ENTRY') {
    targetUrl = notifData.salonId ? `/salons/${notifData.salonId}?tab=queue` : '/queue'
  } else if (action === 'view-booking' || notifData.type === 'NEW_BOOKING') {
    targetUrl = notifData.salonId ? `/salons/${notifData.salonId}?tab=bookings` : '/dashboard'
  } else if (notifData.url) {
    targetUrl = notifData.url
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app is already open — focus it
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus()
          client.navigate(targetUrl)
          return
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl)
      }
    })
  )
})

// ── Background sync ────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-bookings') {
    event.waitUntil(syncBookings())
  }
})

async function syncBookings() {
  // When back online — retry any failed API calls stored in IndexedDB
  console.log('[SW] Syncing bookings in background...')
}
