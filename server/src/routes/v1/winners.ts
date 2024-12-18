import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { ErrorSchema, ParamsSchema, UserSchema } from './schema';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/winners/{id}',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Retrieve winners',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Returns an error',
    },
  },
})

app.openapi(route, (c) => {
  const { id } = c.req.valid('param')
  return c.json(
    {
      id,
      age: 20,
      name: 'Ultra-man',
    },
    200 // You should specify the status code even if it is 200.
  );
},(result, c) => {
  if (!result.success) {
    return c.json(
      {
        code: 400,
        message: 'Validation Error',
      },
      400
    )
  }
})

export default app;
