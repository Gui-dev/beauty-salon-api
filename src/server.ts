import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

import { userRoutes } from './routes/users.routes'
import { AppError } from './errors/app-error'

const app = Fastify()
const PORT = 3333 || process.env.PORT

app.register(userRoutes)

app.setErrorHandler(
  (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof AppError) {
      reply.status(error.statusCode).send({ error: error.message })
    }
    console.log('ERROR: ', error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  },
)

app
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
