import { Hono } from 'hono';
import winners from './winners';

const routes = [winners];

const app = new Hono();

routes.forEach((route) => {
  app.route('/v1', route);
});

export default app;
