// public/sw.js
const CACHE_NAME = "mundial2026-v1";
const urlsToCache = ["/", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  // Network-first para que siempre se vean datos frescos de Firestore;
  // cache solo como respaldo si no hay conexión.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
