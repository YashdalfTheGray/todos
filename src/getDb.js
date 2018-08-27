import { MongoClient } from 'mongodb';
import * as isDocker from 'is-docker';

const dbHost = isDocker() ? 'db' : 'localhost';

const dbCache = {};
/**
 * connects to MongoDB running in either Docker or localhost and
 * returns a reference to the requested database
 * @param {string} dbName the name of the database to connect to
 * @returns {Promise<MongoClient>} a reference to the database requested
 */
export default async function getDb(dbName) {
  try {
    if (Object.keys(dbCache).includes(dbName)) {
      return dbCache[dbName];
    }

    const client = await MongoClient.connect(`mongodb://${dbHost}:27017`);
    const db = client.db(dbName);
    dbCache[dbName] = db;
    return db;
  } catch (error) {
    throw error;
  }
}
