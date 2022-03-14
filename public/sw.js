// Increase the v number when the app is updated
const staticCacheName = "zoodle-v1.1.1";

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
  self.skipWaiting();
  log('install: start');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache.map(f => f + "?from_install"));
    })
	.then(() => {
		log('install: done');
	})
  );
});


async function fetch_and_cache(request) {
    log('Network request (which will be cached) for ' + request.url);
	let response = await fetch(request);
	if (!response) {
		throw "Failed to fetch " + request.url;
	}
	let url = request.url;
	url = url.replace("?sw_installing", "");
	let cache = await caches.open(staticCacheName);
	cache.put(url, response.clone());
	return response;
}

self.addEventListener('fetch', event => {
  let prefix = `fetch (${event.request.url}): `;
  if (event.request.url.indexOf("?from_install") !== -1) {
	  log(prefix + 'passed through');
	  return;
  } else {
	  event.respondWith(
		caches.match(event.request, {ignoreSearch: true}) // so ?from_install is matched
		.then(response => {
		  if (response) {
			  log(prefix + 'cache hit, returning');
			return response;
		  } else {
			  log(prefix + 'cache MISS, passing through without caching response');
			  return fetch(event.request);
		  }

		}).catch(error => {
		  log("Error in TODO 6 code"+ error); // TODO 6 - Respond with custom offline page
		})
	  );
	}
});


self.addEventListener('activate', event => {
  log('activate: start');

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
		log(`activate: cache names are ${cacheNames}`);
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
		    log("activate: deleting " + cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(() => {log("activate: done")});
    })
  );
});


function log(text) {
	console.log("%cService Worker", "color: purple; font-weight: 600; background: white; padding: 0 5px; border-radius: 2px", text);
}