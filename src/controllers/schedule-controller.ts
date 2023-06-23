import { FastifyReply, FastifyRequest } from 'fastify'
import { createScheduleValidation } from '../validation/create-schedule-validation'
import { CreateScheduleService } from '../services/create-schedule-service'
import { listScheduleValidation } from '../validation/list-schedule-validation'
import { ListScheduleService } from '../services/list-schedule-service'

export class ScheduleController {
  public async index(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { date } = listScheduleValidation.parse(request.query)
    const listScheduleService = new ListScheduleService()
    const schedules = await listScheduleService.execute({ date })
    return response.status(201).send({ schedules })
  }

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
