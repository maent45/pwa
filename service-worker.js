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
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] activated');
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] fetching', e.request.url);
});
