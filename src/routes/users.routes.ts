import { FastifyInstance } from 'fastify'

import { UsersController } from '../controllers/UsersController'

const usersController = new UsersController()

export const userRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get('/users', usersController.create)
}
