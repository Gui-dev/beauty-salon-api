import { FastifyReply, FastifyRequest } from 'fastify'
import { createScheduleValidation } from '../validation/create-schedule-validation'
import { CreateScheduleService } from '../services/create-schedule-service'
import { listScheduleValidation } from '../validation/list-schedule-validation'
import { ListScheduleService } from '../services/list-schedule-service'
import {
  updateScheduleDateValidation,
  updateScheduleParamIdValidation,
} from '../validation/update-schedule-validation'
import { UpdateScheduleService } from '../services/update-schedule-service'
import { DeleteScheduleService } from '../services/delete-schedule-service'
import { deleteScheduleParamIdValidation } from '../validation/delete-schedule-validation'

export class ScheduleController {
  public async index(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const user_id = request.user.sub
    const { date } = listScheduleValidation.parse(request.query)
    const listScheduleService = new ListScheduleService()
    const schedules = await listScheduleService.execute({ user_id, date })
    return response.status(201).send(schedules)
  }

  public async store(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const user_id = request.user.sub
    const { name, phone, date } = createScheduleValidation.parse(request.body)
    const createScheduleService = new CreateScheduleService()
    const schedule = await createScheduleService.execute({
      user_id,
      name,
      phone,
      date,
    })
    return response.status(201).send(schedule)
  }

  public async update(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const user_id = request.user.sub
    const { id } = updateScheduleParamIdValidation.parse(request.params)
    const { date } = updateScheduleDateValidation.parse(request.body)
    const updateScheduleService = new UpdateScheduleService()
    const schedule = await updateScheduleService.execute({
      user_id,
      data: {
        id,
        date,
      },
    })

    return response.status(201).send({ schedule })
  }

  public async delete(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = deleteScheduleParamIdValidation.parse(request.params)
    const user_id = request.user.sub
    const deleteScheduleService = new DeleteScheduleService()
    await deleteScheduleService.execute({
      user_id,
      id,
    })
    return response.status(204).send()
  }
}
