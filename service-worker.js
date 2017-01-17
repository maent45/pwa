// set up files to cache
var cacheName = 'v1';
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
  // console.log('[ServiceWorker] fetching', e.request.url);
});
