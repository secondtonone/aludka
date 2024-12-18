import { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

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
  app.use(logger());
}

if (process.env.NODE_ENV === 'production') {
  app.use('/*', cors({
    origin: process.env.WEB_APP || '*',
    credentials: true,
    allowMethods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  }));
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

export default app;
