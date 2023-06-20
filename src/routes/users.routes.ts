import { FastifyInstance } from 'fastify'

import { UsersController } from '../controllers/user-controller'
import { SessionController } from '../controllers/session-controller'

const usersController = new UsersController()
const sessionController = new SessionController()

export const userRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', usersController.store)
  app.post('/users/login', sessionController.store)
  app.put(
    '/users/reset-password',
    {
      onRequest: [app.authenticate],
    },
    usersController.update,
  )
}
