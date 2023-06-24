import { Schedule } from '@prisma/client'

import { IScheduleRepository } from '../contracts/schedule-repository'
import { IUpdateScheduleDTO } from '../dtos/update-schedule-dto'
import { AppError } from '../errors/app-error'
import { ScheduleRepository } from '../repositories/schedule-repository'
import { startOfHour, isBefore, isEqual, getHours } from 'date-fns'

interface IUpdateScheduleServiceRequest {
  user_id: string
  data: IUpdateScheduleDTO
}

export class UpdateScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({
    user_id,
    data: { id, date },
  }: IUpdateScheduleServiceRequest): Promise<Schedule> {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)
    const hour = getHours(hourStart)

    if (isBefore(hourStart, new Date())) {
      throw new AppError('It is not allowed to schedule old date')
    }

    if (hour < 9 || hour >= 18) {
      throw new AppError('Create the schedule is from 9 am to 6 pm')
    }

    const scheduleExists = await this.scheduleRepository.findScheduleById(
      user_id,
      id,
    )

    if (!scheduleExists) {
      throw new AppError('Schedule not found')
    }

    if (user_id !== scheduleExists.user_id) {
      throw new AppError('Unauthorized user')
    }

    if (isEqual(hourStart, new Date(scheduleExists.date))) {
      throw new AppError('Schedule date is not available')
    }

    const schedule = await this.scheduleRepository.update({
      id,
      date: hourStart || scheduleExists.date,
    })

    return schedule
  }
}
