const CACHE_NAME = 'dynamic-image-cache-v1';

self.addEventListener('install', event => {
    self.skipWaiting(); // Active immédiatement le nouveau Service Worker
});

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // Vérifiez si la requête est pour une image dans le dossier /assets/images/
    if (requestUrl.pathname.startsWith('/assets/images/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});
