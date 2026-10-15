// Lichtblick — Offline-Speicher.
// Nach jeder Änderung an der App die Versionsnummer erhöhen, dann holt sich das Handy die neue Fassung.
const VERSION = "lichtblick-v3";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "dc-runtime.js",
  "design-system.js",
  "react-dom.production.min.js",
  "react.production.min.js",
  "tesseract.min.js",
  "inter-cyrillic-ext.woff2",
  "inter-cyrillic.woff2",
  "inter-greek-ext.woff2",
  "inter-greek.woff2",
  "inter-latin-ext.woff2",
  "inter-latin.woff2",
  "inter-vietnamese.woff2",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "apple-touch-icon.png"
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
