import { handle } from 'hono/vercel';
import app from '../server';

export const config = {
  runtime: 'edge'
};

export default handle(app);
