import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connectToCluster(uri: string) {
  try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    return client;
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
  }
}
