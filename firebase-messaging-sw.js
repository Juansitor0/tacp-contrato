importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// ✅ CORREÇÃO: Força o Service Worker a se tornar ativo imediatamente
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

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

// Listener para mensagens push do FCM
self.addEventListener('push', function(event) {
  console.log('[firebase-messaging-sw.js] Push recebido:', event);
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const notificationTitle = data.notification?.title || "TACP Notificação";
  const notificationOptions = {
    body: data.notification?.body || "Você tem uma nova atualização.",
    icon: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
    vibrate: [200, 100, 200],
    tag: 'tacp-notification',
    renotify: true,
    data: {
      url: self.location.origin
    }
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Fallback para o método compat do Firebase
messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Push recebido', payload);
  const notificationTitle = payload.notification.title || "TACP Notificação";
  const notificationOptions = {
    body: payload.notification.body || "Você tem uma nova atualização.",
    icon: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
    vibrate: [200, 100, 200],
    tag: 'tacp-notification',
    renotify: true,
    data: {
      url: self.location.origin
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
