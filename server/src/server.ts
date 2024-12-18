import { serve } from '@hono/node-server';
import app from './app';

const start = () => {
  const port = 3002;
  const served = serve({
    fetch: app.fetch,
    port,
  });

  console.log(`\x1b[32m Server listening at http://localhost:${port}  \x1b[0m`);

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      served.close();
      process.exit(0);
    });
  });
};

start();
