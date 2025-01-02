import type { MongoClient } from 'mongodb';
import type { Transaction, Transactions } from '../schemas/winners';

export async function getWinners({
  limit = 0,
  mongoClient,
}: {
  limit?: number
  mongoClient?: MongoClient;
}) {
  if (mongoClient) {
    try {
      const db = mongoClient.db('ludka');
      const coll = db.collection<Transaction>('winners');
      const cursor = coll.find().limit(limit);
      const results = await cursor.toArray();

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function insertWinners({
  winners,
  mongoClient,
}: {
  winners: Transactions;
  mongoClient?: MongoClient;
}) {
  if (mongoClient) {
    try {
      const db = mongoClient.db('ludka');
      const coll = db.collection<Transaction>('winners');
      const results = await coll.insertMany(winners);

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
