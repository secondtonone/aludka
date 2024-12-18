import { apiReference } from '@scalar/hono-api-reference';

const scalar  = () => apiReference({
    pageTitle: 'Ludka API Reference',
    spec: {
      url: '/doc',
    },
  });

export default scalar;
