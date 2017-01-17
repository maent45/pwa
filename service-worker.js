// set up files to cache
var cacheName = 'v2';
var cacheFiles = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] installed');

  e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] caching cache files');
        // add array to cache
        return cache.addAll(cacheFiles);
      })
  )

});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] activated');

  // remove old cache files
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== cacheName) {
          console.log('[ServiceWorker] removing cached files from ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }))
    })
  )

});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] fetching', e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(

    // Check in cache for the request being made
    caches.match(e.request).then(function(response) {

      // If the request is in the cache
      if (response) {
        console.log("[ServiceWorker] Found in Cache", e.request.url, response);
        // Return the cached version
        return response;
      }

      // If the request is NOT in the cache, fetch and cache
      var requestClone = e.request.clone();
      fetch(requestClone)
        .then(function(response) {

          if (!response) {
            console.log('[ServiceWorker] no response from fetch');
            return response;
          }

          var responseClone = response.clone();

          caches.open(cacheName).then(function(cache) {
            cache.put(e.request, responseClone);
            return response;
          });


        })
        .catch(function(err) {
          console.log('[ServiceWorker] error fetching', err);
        })

    })

  )

});
