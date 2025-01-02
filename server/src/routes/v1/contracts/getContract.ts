import type { FastifyInstance } from 'fastify';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getContracts } from '../../../modules/contracts';
import { contractSchema, ContractSchema } from '../../../schemas/contract';

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
      const contracts = await getContracts({ mongoClient:fastify.mongoClient });

      console.log('contracts: ',contracts);

      const data = contracts?.map(({_id, ...data}) => ({
        id: _id.toString(),
        ...data
      }))[0] || {} as ContractSchema;

      reply.code(201).send({ data });
    }
  );
};

export default getContract;
