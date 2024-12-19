import { FastifyInstance } from 'fastify';

import winners from './winners';

const prefix = '/v1';

const v1 = async (fastify: FastifyInstance) => {
  fastify.register(winners, {
    prefix,
  });
};

export default v1;
