import { apiReference } from '@scalar/hono-api-reference';

const scalar  = (url: string) => apiReference({
    pageTitle: 'Ludka API Reference',
    spec: {
      url,
    },
    theme: 'kepler',
    defaultHttpClient: {
      targetKey: 'javascript',
      clientKey: 'axios'
    },
  });

export default scalar;
