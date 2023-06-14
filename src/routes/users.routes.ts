import { FastifyInstance } from 'fastify'

import { UsersController } from '../controllers/user-controller'

const usersController = new UsersController()

export const userRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', usersController.store)
}
