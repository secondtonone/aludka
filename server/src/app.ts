import cors from '@fastify/cors';
import { connectToCluster } from 'db';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { v1 } from './routes';

const mongoUri = process.env.DATABASE_URL || '';

const getLoggerConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return true;
    case 'development':
      return {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      };
    default:
      return false;
  }
};

export async function build() {
  const app = fastify({ logger: getLoggerConfig() });
  const mongoClient = await connectToCluster(mongoUri);

  if (process.env.NODE_ENV === 'production') {
    app.register(cors, {
      origin: process.env.WEB_APP,
      credentials: true,
      preflightContinue: true,
      methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
    });
  }

  app.decorate('mongoClient', mongoClient);

  app.addHook('onClose', async () => {
    await mongoClient?.close();
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  if (process.env.NODE_ENV === 'development') {
    const swagger = (await import('./plugins/swagger')).default;
    app.register(swagger);

    const scalar = (await import('./plugins/scalar')).default;
    app.register(scalar);
  }

  app.get('/', async () => {
    return { status: 'OK' };
  });

  app.get('/service/', async () => {
    return { status: 'OK' };
  });

  app.register(v1, { prefix: '/service' });

  return app;
}

export default build;
