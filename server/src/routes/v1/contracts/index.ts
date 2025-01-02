import { FastifyInstance } from 'fastify';
import getContract from './getContract';

const contracts = async (fastify: FastifyInstance) => {
  fastify.register(getContract, {
    prefix: '/contracts',
  });
}

export default contracts;
