/* ================================
   Service Worker - Firebase FCM
   ================================ */

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

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

/* 📲 Firebase Messaging */
const messaging = firebase.messaging();

/* ✅ Garante atualização imediata do Service Worker */
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

/* =====================================================
   🔔 PUSH EM SEGUNDO PLANO (APP FECHADO / ABA FECHADA)
   ===================================================== */
messaging.onBackgroundMessage(function (payload) {
    console.log('[sw.js] Push FCM recebido:', payload);

    const notificationTitle =
        payload.notification?.title || 'TACP Notificação';

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

/* =====================================================
   👉 CLIQUE NA NOTIFICAÇÃO
   ===================================================== */
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
                return clients.openWindow('/');
            })
    );
});