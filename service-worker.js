/* ================================
   SERVICE WORKER FAP
   ================================ */

const CACHE_NAME = "fap-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/mais.html",
  "/riz.html",
  "/coton.html",
  "/premium.html",
  "/contact.html",
  "/apropos.html"
];

/* --- Installation du SW --- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Mise en cache des fichiers…");
      return cache.addAll(urlsToCache);
    })
  );
});

/* --- Activation du SW --- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Suppression de l’ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/* --- Interception des requêtes --- */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourne la version cache si dispo, sinon va chercher en ligne
      return response || fetch(event.request);
    })
  );
});
