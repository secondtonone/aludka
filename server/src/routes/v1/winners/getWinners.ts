import type { FastifyInstance } from 'fastify';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getWinners as getDBWinners } from '../../../modules/winners';
import { winnersSchema, WinnersSchema } from '../../../schemas/winners';

const getWinners: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  fastify.get<{
    Reply: { data: WinnersSchema };
  }>(
    '/get-winners',
    {
      schema: {
        description: 'Get winners',
        tags: ['winners'],
        summary: 'Get winners',
        response: {
          201: z.object({ data: winnersSchema}).describe('Successful response'),
        },
      },
    },
    async (request, reply) => {
      let data = [] as WinnersSchema;

      try {
        const winners = await getDBWinners({ mongoClient: fastify.mongoClient });

        console.log('winners: ', winners);

        if (winners) {
          data = winners?.map(({_id, ...data}) => ({
            id: _id.toString(),
            ...data
          })) || [];
        }
      } catch (error) {
        console.log(error);
      }

      reply.code(201).send({ data });
    }
  );
};

export default getWinners;
