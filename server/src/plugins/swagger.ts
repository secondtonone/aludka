import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { createJsonSchemaTransform } from 'fastify-type-provider-zod';
import { version } from '../../package.json';

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(fastifySwagger, {
    mode: 'dynamic',
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Tarot API',
        version,
      },
      components: {
        securitySchemes: {
          /* Authorization: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description:
              '',
          }, */
        },
      },
      tags: [
        {
          name: 'route',
          description: 'Payment-related endpoints',
        },
      ],
    },
    transform: createJsonSchemaTransform({
      skipList: ['/documentation/static/*'],
    }),
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});
