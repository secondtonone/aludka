import { handle } from '@hono/node-server/vercel';
import app from '../server';

const handler = handle(app);

export default handler;
