import { FastifyInstance, FastifyRequest } from 'fastify'
import { ScheduleController } from '../controllers/schedule-controller'

const scheduleController = new ScheduleController()

export const schedulesRoutes = async (app: FastifyInstance): Promise<void> => {
  app.addHook('preHandler', async (request: FastifyRequest) => {
    await request.jwtVerify()
  })

  app.post('/schedules', scheduleController.store)
}
