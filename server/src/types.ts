declare module 'fastify' {
  export interface FastifyInstance {
    something: string;
  }
  export interface FastifyReply {
    locals: { initData: Record<string, string> };
  }
}
