import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { ErrorSchema, WinnerSchema } from './schema';

const app = new Hono();

const route = describeRoute({
  description: 'Get winners',
  summary: 'Get winners',
  tags: ['winners'],
  responses: {
    [HttpStatusCodes.OK]: {
      content: {
        'application/json': {
          schema: resolver(WinnerSchema),
        },
      },
      description: 'Retrieve winners',
    },
    [HttpStatusCodes.BAD_REQUEST]: {
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
  /* if (!winners) {
    return c.json(
      {
        code: HttpStatusCodes.NOT_FOUND,
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  } */
  return c.json(
    [
      {
        amount: 3,
        address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
        currency: 'TON',
      },
      {
        amount: 2000,
        address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
        currency: 'TON',
      },
      {
        amount: 100,
        address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
        currency: 'TON',
      },
      {
        amount: 3000.045,
        address: 'EQBpCjQrzr2SDPvOxFmqxibc2BlXD_bt4siGCKM6Qyhpd3OP',
        currency: 'TON',
      },
    ],
    HttpStatusCodes.OK
  );
});

export default app;
