import { pinoLogger } from 'hono-pino';

export default function logger() {
  return pinoLogger({
    pino: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });
}
