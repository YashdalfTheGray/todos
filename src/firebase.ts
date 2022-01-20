import { initializeApp, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export { getFirestore } from 'firebase/firestore';

export interface IFirebaseTodo {
  id: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  doneAt?: Date;
}

export function initFirebase() {
  try {
    return getApp();
  } catch (_) {
    return initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
      projectId: `${FIREBASE_PROJECT_ID}`,
      storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: FIREBASE_MESSAGING_ID,
      appId: FIREBASE_APP_ID,
    });
  }
}

export function getFirestoreCollection(collectionName: string) {
  const db = getFirestore();
  return collection(db, collectionName);
}

export async function getAllTodos(): Promise<IFirebaseTodo[]> {
  const docs: IFirebaseTodo[] = [];
  const todosCollection = getFirestoreCollection('todos');

  const snapshot = await getDocs(query(todosCollection));
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
  const todosCollection = getFirestoreCollection('todos');

  return addDoc(todosCollection, {
    content,
    createdAt: new Date(),
    modifiedAt: new Date(),
    doneAt: null,
  });
}

export async function markTodoDone(id: string) {
  const todosCollection = getFirestoreCollection('todos');
  const ref = doc(todosCollection, id);

  return updateDoc(ref, { modifiedAt: new Date(), doneAt: new Date() });
}

export async function markTodoUndone(id: string) {
  const todosCollection = getFirestoreCollection('todos');
  const ref = doc(todosCollection, id);

  return updateDoc(ref, { modifiedAt: new Date(), doneAt: null });
}

export async function updateTodo(id: string, content: string) {
  const todosCollection = getFirestoreCollection('todos');
  const ref = doc(todosCollection, id);

  return updateDoc(ref, { content, modifiedAt: new Date() });
}

export async function deleteTodo(id: string) {
  const todosCollection = getFirestoreCollection('todos');
  const ref = doc(todosCollection, id);

  return deleteDoc(ref);
}
