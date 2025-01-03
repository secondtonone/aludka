import { contractSchema, ContractSchema, getContracts } from 'db';
import type { FastifyInstance } from 'fastify';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const getContract: FastifyPluginAsyncZod = async (fastify: FastifyInstance) => {
  fastify.get<{
    Reply: { data: ContractSchema };
  }>(
    '/get-contract',
    {
      schema: {
        description: 'Get contract data',
        tags: ['contracts'],
        summary: 'Get contract data',
        response: {
          201: z.object({ data: contractSchema}).describe('Successful response'),
        },
      },
    },
    async (request, reply) => {
      let data = {} as ContractSchema;

      try {
        const contracts = await getContracts({ mongoClient:fastify.mongoClient });

        if (contracts) {
          data = contracts?.map(({_id, ...data}) => ({
            id: _id.toString(),
            ...data
          }))[0] || {} as ContractSchema;
        }

      } catch (error) {
        console.log(error);
      }

      reply.code(201).send({ data });
    }
  );
};

export default getContract;
