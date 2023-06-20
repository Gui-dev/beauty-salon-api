import 'fastify'
/* eslint-disable no-undef */
declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any
  }
}
