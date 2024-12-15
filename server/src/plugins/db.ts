// import { startDb } from 'db';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

// const { db, client } = startDb(process.env.DATABASE_URL || '');

export default fastifyPlugin(async function (fastify: FastifyInstance) {
  /* fastify.decorate('db', db);

  fastify.addHook('onClose', async () => {
    await client.end();
  }); */
});
