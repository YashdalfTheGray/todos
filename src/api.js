import getDb from './getDb';

const dbName = 'dev';
const collectionName = 'todos';

export default async function getAllTodos() {
  const db = await getDb(dbName);
  const collection = db.collection(collectionName);
  return collection.find({}).toArray();
}
