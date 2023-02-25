import { MONGO_DB_DATABASE_URL, NODE_ENV } from '@config/env';
import { LoggerService } from '@services/logger';
import { MongoClient, MongoClientOptions, Document } from 'mongodb';

declare namespace global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const options: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_DB_DATABASE_URL, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGO_DB_DATABASE_URL, options);
  clientPromise = client.connect();
}

export async function getCollection<T extends Document>(
  collectionName: string
) {
  try {
    const client = await clientPromise;
    const collection = client.db().collection<T>(collectionName);

    return collection;
  } catch (err) {
    LoggerService.log('error', err);
    return null;
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
