// Service Worker for uvniche.com
const CACHE_NAME = 'uvniche-v2';
const urlsToCache = [
  '/pfp.avif',
  '/fonts/inter-latin-400.woff2',
  '/fonts/inter-latin-700.woff2',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event
// - For navigations/HTML: network-first so you always see the latest page
// - For other GET requests (assets): cache-first with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  const isNavigationRequest =
    request.mode === 'navigate' ||
    request.destination === 'document' ||
    (request.headers.get('accept') || '').includes('text/html');

  if (isNavigationRequest) {
    // Network-first for HTML / navigations
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Optionally cache successful HTML responses for offline fallback
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, fall back to any cached version
          return caches.match(request);
        })
    );
    return;
  }

  // Cache-first for static assets and other GET requests
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = request.clone();

      return fetch(fetchRequest).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});

