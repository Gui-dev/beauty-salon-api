import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fp, { PluginMetadata } from 'fastify-plugin'
// const fp = require('fastify-plugin')

export const auth = fp(async function (
  fastify: FastifyInstance,
  opts: PluginMetadata,
) {
  fastify.register(require('@fastify/jwt'), {
    secret: 'beautysalon',
  })

  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.status(401).send({ error: 'Unauthorized user' })
      }
    },
  )
})
