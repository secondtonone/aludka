import { logger } from 'hono/logger';

import { OpenAPIHono } from '@hono/zod-openapi';
import scalar from './plugins/scalar';
import routes from './routes';

import { version } from '../../package.json';

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

const app = new OpenAPIHono();

if (getLoggerConfig()) {
  app.use(logger());
}


app.get('/', (c) => c.json({ status: 'OK' }));

app.get('/service/', (c) => c.json({ status: 'OK' }));

app.route('/service', routes);

if (process.env.NODE_ENV === 'development') {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Ludka API',
      version,
    },
  });

  app.get('/reference', scalar());
}


export default app;
