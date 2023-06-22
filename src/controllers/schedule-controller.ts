import { FastifyReply, FastifyRequest } from 'fastify'
import { createScheduleValidation } from '../validation/create-schedule-validation'
import { CreateScheduleService } from '../services/create-schedule-service'

export class ScheduleController {
  public async store(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { name, phone, date } = createScheduleValidation.parse(request.body)
    const createScheduleService = new CreateScheduleService()
    const schedule = await createScheduleService.execute({ name, phone, date })
    return response.status(201).send({ schedule })
  }
}
