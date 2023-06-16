import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { resolve } from 'node:path'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'

import { userRoutes } from './routes/users.routes'
import { uploadRoutes } from './routes/upload.routes'
import { AppError } from './errors/app-error'

const app = Fastify()
const PORT = 3333 || process.env.PORT

app.register(multipart)
app.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'uploads'),
  prefix: 'uploads',
})
app.register(cors, {
  origin: true,
})
app.register(userRoutes)
app.register(uploadRoutes)

app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({ error: error.message })
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
})

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
