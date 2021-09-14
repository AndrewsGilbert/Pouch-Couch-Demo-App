
var cacheName = 'b7';
// var cacheAssets = [
//     '/1.html',
//     '/1.js',
  
// ]


self.addEventListener('install', e => {

    // e.waitUntil(
    //     caches.open(cacheName)
    //     .then(cache => {
    //         console.log(`Service Worker: Caching Files: ${cache}`);
    //         cache.addAll(cacheAssets)
    //             .then(() => self.skipWaiting())
    //     })
    // );
})

self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cache => {
                        if (cache !== cacheName) {
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    }
                )
            )
        })
    );
})

// self.addEventListener('fetch', e => {
//     console.log('Service Worker: Fetching');
//     e.respondWith(
//         fetch(e.request).catch(() => caches.match(e.request))
        
//     );
// });

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
         
            const resClone = res.clone();
           
            caches.open(cacheName)
                .then(cache => {
                  
                    cache.put(e.request, resClone);
                });
            return res;
        }).catch(
            err => caches.match(e.request)
            .then(res => res)
        )
    );
});