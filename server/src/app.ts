import { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi';
import { cors } from 'hono/cors';
import notFound from 'stoker/middlewares/not-found';
import onError from 'stoker/middlewares/on-error';

import pinoLogger from './plugins/pino-logger';
import scalar from './plugins/scalar';
import routes from './routes';

import { version } from '../package.json';

const getLoggerConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return false;
    case 'development':
      return true;
    default:
      return false;
  }
};

const app = new Hono();

if (getLoggerConfig()) {
  app.use(pinoLogger());
}

if (process.env.NODE_ENV === 'production') {
  app.use(
    '/*',
    cors({
      origin: process.env.WEB_APP || '*',
      credentials: true,
      allowMethods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
    })
  );
}

app
  .get('/', (c) => c.json({ status: 'OK' }))
  .get('/service/', (c) => c.json({ status: 'OK' }));

app.route('/service', routes);

if (process.env.NODE_ENV === 'development') {
  const docPath = '/doc';

  app
    .get(
      docPath,
      openAPISpecs(app, {
        documentation: {
          info: {
            title: 'Ludka',
            version,
            description: 'API for Ludka',
          },
        },
      })
    )
    .get('/reference', scalar(docPath));
}

app.onError(onError);
app.notFound(notFound);

export default app;
