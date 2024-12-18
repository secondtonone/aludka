import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { ErrorSchema, WinnerSchema } from './schema';

const app = new Hono();

const route = describeRoute({
  description: 'Get winners',
  summary: 'Get winners',
  tags: ['winners'],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: resolver(WinnerSchema),
        },
      },
      description: 'Retrieve winners',
    },
    400: {
      content: {
        'application/json': {
          schema: resolver(ErrorSchema),
        },
      },
      description: 'Returns an error',
    },
  },
  validateResponse: true,
});

app.get('/winners', route, (c) => {
  // const { id } = c.req.valid('param')
  return c.json(
    {
      id: 3,
      age: 20,
      name: 'Ultra-man',
    },
    200 // You should specify the status code even if it is 200.
  );
});

export default app;
