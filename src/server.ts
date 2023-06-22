import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { resolve } from 'node:path'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'

import { server } from './shared'
import { auth } from './plugins/auth'
import { userRoutes } from './routes/users.routes'
import { uploadRoutes } from './routes/upload.routes'
import { schedulesRoutes } from './routes/schedules.routes'
import { AppError } from './errors/app-error'

export const main = () => {
  const PORT = 3333 || process.env.PORT

  server.register(multipart)
  server.register(fastifyStatic, {
    root: resolve(__dirname, '..', 'uploads'),
    prefix: '/uploads',
  })
  server.register(cors, {
    origin: true,
  })
  server.register(auth)
  server.register(userRoutes)
  server.register(uploadRoutes)
  server.register(schedulesRoutes)

  server.setErrorHandler(
    (error, request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof AppError) {
        reply.status(error.statusCode).send({ error: error.message })
      }
      if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
        reply.status(401).send({ error: 'Unauthorized user' })
      }
      if (error instanceof ZodError) {
        const toSend = {
          message: 'Validation error',
          errors: JSON.parse(error.message),
          statusCode: error.statusCode || 400,
        }
        return reply.code(toSend.statusCode).send(toSend)
      }
      console.log('ERROR: ', error)
      return reply.status(500).send({ error: 'Internal Server Error' })
    },
  )

  server
    .listen({
      port: PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log('🚀 Server running on http://localhost:3333')
    })
    .catch((error) => {
      console.log(error)
    })
}

main()
