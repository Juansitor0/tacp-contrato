importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage(function(payload) {
  console.log('[sw.js] Mensagem em segundo plano recebida:', payload);
  const notificationTitle = payload.notification.title || "TACP Notificação";
  const notificationOptions = {
    body: payload.notification.body || "Você tem uma nova atualização.",
    icon: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1182/1182761.png',
    vibrate: [200, 100, 200],
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
