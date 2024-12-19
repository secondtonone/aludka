import scalar from '@scalar/fastify-api-reference';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(scalar, {
    routePrefix: '/reference',
    configuration: {
      theme: 'kepler',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'axios'
      },
      spec: {
        content: () => fastify.swagger(),
      },
    },
  })
});
