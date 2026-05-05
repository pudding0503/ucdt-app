const CACHE_NAME = "ucdt-app-shell-v1";
const APP_SHELL = ["/", "/manifest.webmanifest", "/favicon.ico", "/icon", "/apple-icon", "/pwa-icon-192"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put("/", clonedResponse));
          return response;
        })
        .catch(async () => {
          return (await caches.match(request)) ?? (await caches.match("/"));
        }),
    );
    return;
  }

  if (["style", "script", "worker", "font", "image"].includes(request.destination) || url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          if (response.ok) {
            const clonedResponse = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
          }

          return response;
        });
      }),
    );
  }
});
