const CACHE_NAME = 'aipath-v2'
const NETWORK_TIMEOUT_MS = 3000

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
]

// Instalar: cachear shell mínimo
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

// Network First con timeout — para JS, CSS, HTML
// Intenta red primero; si no responde en 3s o falla, usa cache
function networkFirst(request) {
  return new Promise(resolve => {
    let networkDone = false
    let cacheDone = false

    const timeout = setTimeout(() => {
      if (!networkDone) {
        caches.match(request).then(cached => {
          if (!cacheDone && cached) {
            cacheDone = true
            resolve(cached)
          }
        })
      }
    }, NETWORK_TIMEOUT_MS)

    fetch(request).then(response => {
      networkDone = true
      clearTimeout(timeout)
      if (!cacheDone) {
        cacheDone = true
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        resolve(response)
      }
    }).catch(() => {
      networkDone = true
      clearTimeout(timeout)
      if (!cacheDone) {
        cacheDone = true
        caches.match(request).then(cached => {
          resolve(cached || new Response('Offline', { status: 503 }))
        })
      }
    })
  })
}

// Cache First — solo para imágenes/íconos que no cambian frecuente
function cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached
    return fetch(request).then(response => {
      if (response.ok) {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
      }
      return response
    }).catch(() => caches.match(request))
  })
}

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) return

  // Imágenes y íconos — Cache First (no cambian entre deploys)
  if (url.pathname.endsWith('.png') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.ico')) {
    event.respondWith(cacheFirst(request))
    return
  }

  // JS, CSS, HTML, JSON — Network First (siempre tomar versión más nueva)
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.json') ||
    request.mode === 'navigate' ||
    url.pathname.startsWith('/assets/')
  ) {
    event.respondWith(networkFirst(request))
    return
  }

  // Todo lo demás — Network con fallback a cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})
