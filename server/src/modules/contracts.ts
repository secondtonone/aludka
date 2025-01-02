import { MongoClient } from 'mongodb';
import type { ContractData, ContractSchema } from '../schemas/contract';

export async function getContracts({
  mongoClient,
}: {
  mongoClient?: MongoClient;
}) {
  if (mongoClient) {
    try {
      const db = mongoClient.db('ludka');
      const coll = db.collection<ContractData>('contracts');
      const cursor = coll.find();
      const results = await cursor.toArray();

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getContract({
  mongoClient,
  params,
}: {
  mongoClient?: MongoClient;
  params: Partial<ContractSchema>;
}) {
  if (mongoClient) {
    try {
      const db = mongoClient.db('ludka');
      const coll = db.collection<ContractData>('contracts');
      const result = coll.findOne(params);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function replaceContract({
  mongoClient,
  params,
}: {
  mongoClient?: MongoClient;
  params: ContractData;
}) {
  if (mongoClient) {
    try {
      const db = mongoClient.db('ludka');
      const coll = db.collection<ContractData>('contracts');
      const result = coll.replaceOne({ contractId: params.contractId }, params);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function insertContracts({
  mongoClient,
  contracts,
}: {
  mongoClient?: MongoClient;
  contracts: ContractData[];
}) {
  if (mongoClient) {
    try {
      const db = mongoClient.db('ludka');
      const coll = db.collection<ContractData>('contracts');
      const results = await coll.insertMany(contracts);

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
