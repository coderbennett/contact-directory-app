// TODO: Create a service worker that caches static assets:
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';



precacheAndRoute(self.__WB_MANIFEST);


registerRoute(
    ({request })=> [ 'style', 'script', 'worker'].includes(request.destination),
    matchCallback,
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
        plugins:[
            new CacheableResponsePlugin({
                statuses: [0,200],
            }),
        ],
    })
);
