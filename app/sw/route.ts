import packageJson from "@/package.json";

const APP_SHELL = ["/", "/manifest.webmanifest", "/favicon.ico", "/icon", "/apple-icon", "/pwa-icon-192"];
const CACHEABLE_PREFIXES = ["/_next/static/", "/_next/image"];

function createServiceWorkerSource(version: string) {
  return `const CACHE_NAME = "ucdt-app-shell-${version}";
const APP_SHELL = ${JSON.stringify(APP_SHELL)};
const CACHEABLE_PATHS = new Set(APP_SHELL);
const CACHEABLE_PREFIXES = ${JSON.stringify(CACHEABLE_PREFIXES)};

function shouldCachePath(pathname) {
  if (CACHEABLE_PATHS.has(pathname)) {
    return true;
  }

  return CACHEABLE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isCacheableResponse(response) {
  return response.ok && response.status === 200;
}

function putInCache(request, response) {
  if (!isCacheableResponse(response)) {
    return Promise.resolve();
  }

  return caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .catch(() => undefined);
}

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

  if (request.method !== "GET" || request.headers.has("range")) {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(async () => {
          return (await caches.match(request, { ignoreSearch: true })) ?? (await caches.match("/"));
        }),
    );
    return;
  }

  if (!shouldCachePath(url.pathname)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (isCacheableResponse(response)) {
          void putInCache(request, response.clone());
        }

        return response;
      });
    }),
  );
});
`;
}

export async function GET() {
  return new Response(createServiceWorkerSource(packageJson.version), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
