import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { v1 } from './routes';

// import 'newrelic';

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

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  // app.register(db);

  if (process.env.NODE_ENV === 'development') {
    const swagger = (await import('./plugins/swagger')).default;
    app.register(swagger);

    const scalar = (await import('./plugins/scalar')).default;
    app.register(scalar);
  }

  // app.decorate('something', 'something');


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
