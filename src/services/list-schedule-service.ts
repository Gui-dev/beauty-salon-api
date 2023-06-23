import { Schedule } from '@prisma/client'
import { parseISO } from 'date-fns'

import { IScheduleRepository } from '../contracts/schedule-repository'
import { ScheduleRepository } from '../repositories/schedule-repository'
import { AppError } from '../errors/app-error'

interface IListScheduleService {
  date?: Date
}

export class ListScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({ date }: IListScheduleService): Promise<Schedule[]> {
    const parseDate = date ? parseISO(date.toString()) : new Date()
    const schedules = await this.scheduleRepository.findAll(parseDate)

    if (!schedules) {
      throw new AppError('There is no schedule for today')
    }

    return schedules
  }
}
