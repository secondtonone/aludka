import { handle } from 'hono/vercel';
import app from '../server/dist/app';

export default handle(app);
