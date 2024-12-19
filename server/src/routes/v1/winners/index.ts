import { FastifyInstance } from 'fastify';
import getWinners from './getWinners';

const winners = async (fastify: FastifyInstance) => {
  fastify.register(getWinners, {
    prefix: '/winners',
  });
}

export default winners;
