// Increase the v number when the app is updated
const staticCacheName = "zoodle-v1.0.1";

const filesToCache = [
	"./",
	"./global.css",
	"./index.html",
	"./manifest.json",
	"./build/bundle.css",
	"./img/zoodle_logo_32x32.png",
	"./build/bundle.js"
];


self.addEventListener('install', event => {
  log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache.map(f => f + "?sw_installing"));
    })
  );
});


async function fetch_and_cache(request) {
    log('Network request (which will be cached) for ' + request.url);
	let response = await fetch(request);
	if (!response) {
		throw "Failed to fetch " + request.url;
	}
	let cache = await caches.open(staticCacheName);
	cache.put(request.url, response.clone());
	return response;
}

self.addEventListener('fetch', event => {
  log('Fetch event for ' + event.request.url);
  if (event.request.url.indexOf("?sw_installing") !== -1) {
	  event.request.url = event.request.url.replace("?sw_installing", "");
	  event.respondWith(fetch_and_cache(event.request));
  } else {
	  event.respondWith(
		caches.match(event.request)
		.then(response => {
		  if (response) {
		    log('Found '+ event.request.url+ ' in cache');
			return response;
		  } else {
			  return fetch_and_cache(event.request);
		  }

		}).catch(error => {
		  log("Error in TODO 6 code"+ error); // TODO 6 - Respond with custom offline page
		})
	  );
	}
});


self.addEventListener('activate', event => {
  log('Activating new service worker...');

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
		    log("DELETING " + cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(() => {log("ACTIVATION DONE BABY")});
    })
  );
});


function log(text) {
	console.log("%cService Worker", "color: purple; font-weight: 600; background: white; padding: 0 5px; border-radius: 2px", text);
}