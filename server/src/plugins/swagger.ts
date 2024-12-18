import { swaggerUI } from '@hono/swagger-ui';
import { version } from '../../package.json';

const swagger = () =>
  swaggerUI({ 
    url: '/doc',
    title: 'Ludka API',
    version,
  });

export default swagger;
