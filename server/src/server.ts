import build from './app';

const start = async () => {
  let app;

  try {
    app = await build();
    await app.listen({ port: 3002, host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      await app.close();
  
      process.exit(0);
    });
  });
};

start();
