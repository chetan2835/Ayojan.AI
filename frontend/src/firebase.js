import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDncp81_i1YEHKH2DgLW6nglz4mrkrYgnU",
  authDomain: "eventhorizon-f61fc.firebaseapp.com",
  projectId: "eventhorizon-f61fc",
  storageBucket: "eventhorizon-f61fc.firebasestorage.app",
  messagingSenderId: "180788271651",
  appId: "1:180788271651:web:09a05873eeddf949ecef96"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export default app;