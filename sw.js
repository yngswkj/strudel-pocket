"use strict";

const SHELL_CACHE_NAME = "strudel-pocket-shell-v3";
const SAMPLE_CACHE_NAME = "strudel-pocket-samples-v1";
const LIB_CACHE_NAME = "strudel-pocket-libs-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/gm-soundfonts.json"
];
const SAMPLE_ORIGINS = new Set([
  "https://strudel.b-cdn.net",
  "https://raw.githubusercontent.com",
  "https://cdn.jsdelivr.net",
  "https://felixroos.github.io"
]);
const LIB_ORIGINS = new Set([
  "https://unpkg.com",
  "https://esm.sh"
]);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(SHELL_CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  const keep = new Set([SHELL_CACHE_NAME, SAMPLE_CACHE_NAME, LIB_CACHE_NAME]);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => !keep.has(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (SAMPLE_ORIGINS.has(url.origin)) {
    event.respondWith(cacheFirst(event.request, SAMPLE_CACHE_NAME, event));
    return;
  }

  if (LIB_ORIGINS.has(url.origin)) {
    event.respondWith(cacheFirst(event.request, LIB_CACHE_NAME, event));
    return;
  }

  if (url.origin !== location.origin) return;

  if (event.request.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) {
    event.respondWith(networkFirstShell(event.request, event));
    return;
  }

  event.respondWith(cacheFirst(event.request, SHELL_CACHE_NAME, event));
});

function cacheFirst(request, cacheName, event) {
  if (request.headers.has("range")) return fetch(request);
  return caches.open(cacheName).then(cache =>
    cache.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.status !== 206 && (response.ok || response.type === "opaque")) {
          const put = cache.put(request, response.clone()).catch(() => {});
          if (event) event.waitUntil(put);
        }
        return response;
      });
    })
  );
}

function networkFirstShell(request, event) {
  // GitHub PagesのHTTPキャッシュ(max-age=600)を無視して常に再検証し、更新を即配信する
  return fetch(new Request(request, { cache: "no-cache" }))
    .then(response => {
      if (response && response.ok) {
        const put = caches.open(SHELL_CACHE_NAME)
          .then(cache => cache.put(request, response.clone()))
          .catch(() => {});
        if (event) event.waitUntil(put);
      }
      return response;
    })
    .catch(() => caches.match(request).then(cached => cached || caches.match("./index.html")));
}
