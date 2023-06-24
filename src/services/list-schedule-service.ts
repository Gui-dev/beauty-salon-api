import { Schedule } from '@prisma/client'
import { parseISO } from 'date-fns'

import { IScheduleRepository } from '../contracts/schedule-repository'
import { ScheduleRepository } from '../repositories/schedule-repository'
import { AppError } from '../errors/app-error'

interface IListScheduleService {
  user_id: string
  date?: Date
}

export class ListScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({
    user_id,
    date,
  }: IListScheduleService): Promise<Schedule[]> {
    const parseDate = date ? parseISO(date.toString()) : new Date()
    const schedules = await this.scheduleRepository.findAll(user_id, parseDate)

    if (!schedules) {
      throw new AppError('There is no schedule for today')
    }

    return schedules
  }
}
