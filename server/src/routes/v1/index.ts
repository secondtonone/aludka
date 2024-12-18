import { OpenAPIHono } from "@hono/zod-openapi";
import winners from './winners';

const app = new OpenAPIHono();

app.route('/v1', winners)

export default app;
