const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Takes array of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Allows loading provided URLs into cache during service worker's "install" phase.
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Implements asset caching.
registerRoute(
  // Defines callback function that filters requests to cache (JS and CSS files)
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new CacheFirst({
    // Names cache storage.
    cacheName: "asset-cache",
    plugins: [
      // This plugin caches responses with these headers (maximum-age 30 days).
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
