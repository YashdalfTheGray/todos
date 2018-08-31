import firebase from 'firebase/app';
import 'firebase/firestore';

export default function initFirebase() {
  return firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: `${FIREBASE_PROJECT_ID}`,
    messagingSenderId: FIREBASE_MESSAGING_ID
  });
}

export function getFirestore() {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  return db;
}

export function getFirestoreCollection(collectionName) {
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  return db.collection(collectionName);
}

// (async () => {
//   try {
//     const db = firebase.firestore();
//     db.settings({ timestampsInSnapshots: true });
//     const snapshot = await db.collection('todos').get();
//     snapshot.forEach(d => console.log(d.data()));
//   } catch (error) {
//     console.error(error);
//   }
// })();
