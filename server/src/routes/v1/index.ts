import { Hono } from "hono";
import winners from './winners';

const app = new Hono();

app.route('/v1', winners)

export default app;
