import type { MongoClient } from 'mongodb';

declare module 'fastify' {
  export interface FastifyInstance {
    mongoClient?: MongoClient;
  }
}
