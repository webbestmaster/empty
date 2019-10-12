// sw.js

/* global self, caches */

const cacheName = 'my-pwa-cache-v.0021';

self.addEventListener('install', evt => {
    evt.waitUntil(
        // после установки service worker
        // открыть новый кэш
        caches.open(cacheName).then(cache => {
            // добавляем все URL ресурсов, которые хотим закэшировать ЗАРАНЕЕ!!!
            return cache.addAll([
                '/',
                // '/static/',
                // '/index.html',
                // '/about.html',
                // '/images/doggo.jpg',
                // '/styles/main.min.css',
                // '/scripts/main.min.js',
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    // add logic to cache or not here
    if (event.request.url.includes('/static1111111/') || event.request.url === 'http://localhost:8081/') {
        const updateCache = function (request) {
            return caches.open(cacheName).then(function (cache) {
                return fetch(request).then(function (response) {
                    console.log(response.url);
                    console.log('[PWA Builder] add page to offline ' + response.url);
                    return cache.put(request, response);
                });
            });
        };

        event.waitUntil(updateCache(event.request));
        event.respondWith(
            fetch(event.request).catch(function (error) {
                console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);
                return caches.open(cacheName).then(function (cache) {
                    return cache.match(event.request).then(function (matching) {
                        return !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
                    });
                });
            })
        );
    }
});
