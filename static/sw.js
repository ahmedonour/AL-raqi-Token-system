// Minimal no-op service worker to prevent 404 when site expects /sw.js
// This keeps the behavior benign for development and avoids missing-resource errors.

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of the page immediately
  event.waitUntil(self.clients.claim());
});

// Optional fetch handler: passthrough by default
self.addEventListener('fetch', (event) => {
  // Do not intercept; let the browser handle requests normally
});
