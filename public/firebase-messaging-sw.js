importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAuw76AEvgz6dTleAPqnLKFW0cH0r3DOpg",
  authDomain: "bizhub-monitor.firebaseapp.com",
  projectId: "bizhub-monitor",
  storageBucket: "bizhub-monitor.firebasestorage.app",
  messagingSenderId: "482111615330",
  appId: "1:482111615330:web:3756a9db89e72c3c4b3c3b",
  measurementId: "G-Z19P4P6SGH",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.data;

  const notificationOptions = {
    body,
    icon,
  };

  self.registration.showNotification(title, notificationOptions);
});