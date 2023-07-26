import { FastifyInstance } from 'fastify'

import { UsersController } from '../controllers/user-controller'
import { SessionController } from '../controllers/session-controller'
import { RefreshTokenController } from '../controllers/refresh-token-controller'

const usersController = new UsersController()
const sessionController = new SessionController()
const refreshTokenController = new RefreshTokenController()

export const userRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', usersController.store)
  app.post('/users/login', sessionController.store)
  app.post('/users/refresh', refreshTokenController.create)
  app.put(
    '/users/reset-password',
    {
      onRequest: [app.authenticate],
    },
    usersController.update,
  )
}
