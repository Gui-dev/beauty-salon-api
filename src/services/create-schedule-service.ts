import { Schedule } from '@prisma/client'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'
import { ScheduleRepository } from '../repositories/schedule-repository'
import { IScheduleRepository } from '../contracts/schedule-repository'
import { getHours, isBefore, startOfHour } from 'date-fns'
import { AppError } from '../errors/app-error'

export class CreateScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({
    user_id,
    name,
    phone,
    date,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)
    const hour = getHours(hourStart)

    if (isBefore(hourStart, new Date())) {
      throw new AppError('It is not allowed to schedule old date')
    }

    if (hour < 9 || hour >= 18) {
      throw new AppError('Create the schedule is from 9 am to 6 pm')
    }

    const checkIsAvailable = await this.scheduleRepository.findScheduleByDate(
      user_id,
      hourStart,
    )
    if (checkIsAvailable) {
      throw new AppError('Schedule date is not available')
    }
    const schedule = await this.scheduleRepository.create({
      user_id,
      name,
      phone,
      date: hourStart,
    })
    return schedule
  }
}
