import { FastifyInstance } from 'fastify';

import contracts from './contracts';
import winners from './winners';

const prefix = '/v1';

const v1 = async (fastify: FastifyInstance) => {
  fastify.register(winners, {
    prefix,
  });

  fastify.register(contracts, {
    prefix,
  });
};

export default v1;
