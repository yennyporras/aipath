const CACHE_NAME = 'estratek-ia-v1.0.0'

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/etk-logo-white.png',
  '/icon-192.png',
  '/icon-512.png'
]

// Instalar: cachear shell de la app
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS)
    }).then(() => self.skipWaiting())
  )
})

// Activar: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch: Cache First para assets, Network First para navegación
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) return

  // Assets (JS, CSS, imágenes, JSON) — Cache First
  if (url.pathname.startsWith('/assets/') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.json') ||
      url.pathname.endsWith('.svg')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          }
          return response
        })
      }).catch(() => caches.match(request))
    )
    return
  }

  // Navegación (HTML) — Network First con fallback a cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return response
      }).catch(() => caches.match('/index.html'))
    )
    return
  }

  // Todo lo demás — Network con fallback a cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})
