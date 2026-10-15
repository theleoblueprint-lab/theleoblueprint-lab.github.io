// Lichtblick — Offline-Speicher.
// Nach jeder Änderung an der App die Versionsnummer erhöhen, dann holt sich das Handy die neue Fassung.
const VERSION = "lichtblick-v3";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/dc-runtime.js",
  "assets/design-system.js",
  "assets/react-dom.production.min.js",
  "assets/react.production.min.js",
  "assets/tesseract.min.js",
  "fonts/inter-cyrillic-ext.woff2",
  "fonts/inter-cyrillic.woff2",
  "fonts/inter-greek-ext.woff2",
  "fonts/inter-greek.woff2",
  "fonts/inter-latin-ext.woff2",
  "fonts/inter-latin.woff2",
  "fonts/inter-vietnamese.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Texterkennung lädt ihre Sprachdaten aus dem Netz

  // Seite: erst Netz (für Updates), sonst Offline-Kopie
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  // alles andere: Offline-Kopie zuerst
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
