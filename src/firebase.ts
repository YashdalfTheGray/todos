import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface IFirebaseTodo {
  id: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  doneAt?: Date;
}

export function initFirebase() {
  return firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: `${FIREBASE_PROJECT_ID}`,
    storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: FIREBASE_MESSAGING_ID,
    appId: FIREBASE_APP_ID,
  });
}

export function getFirestore() {
  const db = firebase.firestore();
  return db;
}

export function getFirestoreCollection(collectionName: string) {
  const db = firebase.firestore();
  return db.collection(collectionName);
}

export async function getAllTodos(): Promise<IFirebaseTodo[]> {
  const docs: IFirebaseTodo[] = [];
  const collection = getFirestoreCollection('todos');

  const snapshot = await collection.get();
  snapshot.forEach((d) =>
    docs.push({
      id: d.id,
      createdAt: d.get('createdAt').toDate(),
      content: d.get('content'),
      modifiedAt: d.get('modifiedAt').toDate(),
      doneAt: d.get('doneAt') ? d.get('doneAt').toDate() : null,
    })
  );

  return docs;
}

export async function createTodo(content: string) {
  const collection = getFirestoreCollection('todos');

  return collection.add({
    content,
    createdAt: new Date(),
    modifiedAt: new Date(),
    doneAt: null,
  });
}

export async function markTodoDone(id: string) {
  const collection = getFirestoreCollection('todos');

  return collection
    .doc(id)
    .update({ modifiedAt: new Date(), doneAt: new Date() });
}

export async function markTodoUndone(id: string) {
  const collection = getFirestoreCollection('todos');

  return collection.doc(id).update({ modifiedAt: new Date(), doneAt: null });
}

export async function updateTodo(id: string, content: string) {
  const collection = getFirestoreCollection('todos');
  return collection.doc(id).update({ content, modifiedAt: new Date() });
}

export async function deleteTodo(id: string) {
  const collection = getFirestoreCollection('todos');
  return collection.doc(id).delete();
}
