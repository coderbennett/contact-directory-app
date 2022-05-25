// TODO: Create a service worker that caches static assets:
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Import the expiration plugin
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

const cachName = 'static-resources';
const matchCallback = ({request})=> {
    console.log(request);
    return(
        request.destination === 'style' ||
        request.destination === 'script'
    );
};

registerRoute(
    matchCallback,
    new StaleWhileRevalidate({
        cacheName,
        plugins:[
            new CacheableResponsePlugin({
                statuses: [0,200],
            }),
        ],
    })
);
