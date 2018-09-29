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

export async function getAllTodos() {
  const docs = [];
  const collection = getFirestoreCollection('todos');

  const snapshot = await collection.get();
  snapshot.forEach(d =>
    docs.push({
      id: d.id,
      createdAt: d.get('createdAt').toDate(),
      content: d.get('content'),
      modifiedAt: d.get('modifiedAt').toDate(),
      doneAt: d.get('doneAt') ? d.get('doneAt').toDate() : null
    })
  );

  return docs;
}

export async function createTodo(content) {
  const collection = getFirestoreCollection('todos');

  return collection.add({
    content: content,
    createdAt: new Date(),
    modifiedAt: new Date(),
    doneAt: null
  });
}

export async function markTodoDone(id) {
  const collection = getFirestoreCollection('todos');

  return collection
    .doc(id)
    .update({ modifiedAt: new Date(), doneAt: new Date() });
}

export async function updateTodo(id, content) {
  const collection = getFirestoreCollection('todos');
  return collection
    .doc(id)
    .update({ content: content, modifiedAt: new Date() });
}
