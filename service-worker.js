// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('mi-ecommerce-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/images/logo.png',
        '/images/icon-192x192.png',
        '/images/icon-512x512.png'
      ]);
    })
  );
});

// Recuperar los archivos de la caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Actualizar el Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['mi-ecommerce-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
