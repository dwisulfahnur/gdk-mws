self.addEventListener('install', function(e) {
});

var cacheName = 'dwisulfahnurPwa-v1';
var contentToCache = [
  '/index.html',
  '/css/main.css',
  '/images/home.svg',
  '/images/icon.ico',
  '/images/icon.svg',
  '/images/profile.jpg',
  '/js/add2numbers.js',
  '/project1/index.html',
  '/project2/index.html',
  '/project3/index.html',
  '/project3/restaurant.html',
  '/project3/css/styles.css',
  '/project3/data/restaurants.json',
  '/project3/js/main.js',
  '/project3/js/restaurant_info.js',
  '/project3/js/dbhelper.js',
  '/project3/js/',
  '/project3/img/',
  '/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(contentToCache)
    })
  );
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(function(r) {
      return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
