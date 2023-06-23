import { Schedule } from '@prisma/client'

import { IScheduleRepository } from '../contracts/schedule-repository'
import { IUpdateScheduleDTO } from '../dtos/update-schedule-dto'
import { AppError } from '../errors/app-error'
import { ScheduleRepository } from '../repositories/schedule-repository'
import { startOfHour, isBefore, isEqual } from 'date-fns'

export class UpdateScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({ id, date }: IUpdateScheduleDTO): Promise<Schedule> {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)

    if (isBefore(hourStart, new Date())) {
      throw new AppError('It is not allowed to schedule old date')
    }
    const scheduleExists = await this.scheduleRepository.findScheduleById(id)

    if (!scheduleExists) {
      throw new AppError('Schedule not found')
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
