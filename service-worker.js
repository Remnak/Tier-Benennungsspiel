self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('tier-spiel-cache').then(cache => {
      return cache.addAll([
        '/',
        '/tier_benennungsspiel.html',
        '/spiel_design.css',
        '/spiel_logik.js',
        '/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});