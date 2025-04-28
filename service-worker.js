const CACHE_NAME = "toukea-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/axel.jpg",
  "/axel1.jpg"
];

// Installation du service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[Service Worker] Caching files...");
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener("activate", event => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch des ressources
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne le cache ou fait un fetch
        return response || fetch(event.request);
      })
  );
});
