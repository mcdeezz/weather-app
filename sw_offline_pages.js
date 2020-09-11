const cacheName = "v1";
const cacheAssets = [
  "index.html",
  "/style/style.css",
  "/js/util.js",
  "/js/script.js",
];

// call the install event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// call activate event
self.addEventListener("activate", (e) => {
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call fetch event

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      caches.match(e.request);
    })
  );
});
