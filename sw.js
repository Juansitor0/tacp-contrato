/* ================================
   Service Worker - TACP v2.1
   ================================ */

const CACHE_NAME = 'tacp-cache-v2.1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

self.addEventListener('install', event => {
  console.log('[SW] Instalando v2.1...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => console.warn('[SW] Falha ao cachear assets:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Ativando v2.1 e limpando caches antigos...');
  event.waitUntil(
    Promise.all([
      clients.claim(),
      caches.keys().then(keys => {
        return Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        );
      })
    ])
  );
});

self.addEventListener('fetch', event => {
  // Não interceptar chamadas de áudio ou externas que podem falhar por CORS
  if (event.request.url.includes('wikia') || event.request.url.includes('minecraft.wiki') || event.request.url.includes('spotify')) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

/* 🔥 Firebase config */
firebase.initializeApp({
    apiKey: "AIzaSyDeXp1gHm2cyd0MPRbyj7NMm0HlnlI9tCE",
    authDomain: "contrato-online.firebaseapp.com",
    databaseURL: "https://contrato-online-default-rtdb.firebaseio.com",
    projectId: "contrato-online",
    storageBucket: "contrato-online.firebasestorage.app",
    messagingSenderId: "707541071284",
    appId: "1:707541071284:web:6bc61a769477e24feeaee1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[sw.js] Push FCM recebido:', payload);

    const notificationTitle = payload.notification?.title || 'TACP Notificação';
    const notificationOptions = {
        body: payload.notification?.body || 'Você tem uma nova atualização.',
        icon: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
        vibrate: [200, 100, 200],
        tag: 'tacp-notification',
        renotify: true,
        requireInteraction: true,
        data: {
            url: self.location.origin
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function (clientList) {
                for (const client of clientList) {
                    if ('focus' in client) {
                        return client.focus();
                    }
                }
                return clients.openWindow('./');
            })
    );
});
