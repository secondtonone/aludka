import type { FastifyInstance } from 'fastify';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { winnerSchema, WinnerSchema } from './schema';

const getWinners: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  fastify.get<{
    Reply: { data: WinnerSchema };
  }>(
    '/get-winners',
    {
      schema: {
        description: 'Get winners',
        tags: ['winners'],
        summary: 'Get winners',
        response: {
          201: z.object({ data: winnerSchema}).describe('Successful response'),
        },
      },
    },
    async (request, reply) => {
      reply.code(201).send({ data: [
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
      ] });
    }
  );
};

export default getWinners;
