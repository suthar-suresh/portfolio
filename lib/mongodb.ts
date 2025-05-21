// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string; // Add your MongoDB URI to .env
const options = {};
console.log('mongodb uri',uri)
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}
if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri, options);
  (global as any)._mongoClientPromise = client.connect();
}
clientPromise = (global as any)._mongoClientPromise;


export async function connectToDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(); // Return the database instance
}
