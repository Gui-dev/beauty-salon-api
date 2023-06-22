import { Schedule } from '@prisma/client'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'
import { ScheduleRepository } from '../repositories/schedule.repository'
import { IScheduleRepository } from '../contracts/schedule-repository'
import { isBefore, startOfHour } from 'date-fns'
import { AppError } from '../errors/app-error'

export class CreateScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({
    name,
    phone,
    date,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)

    if (isBefore(hourStart, new Date())) {
      throw new AppError('It is not allowed to schedule old date')
    }
    const checkIsAvailable = await this.scheduleRepository.findScheduleByDate(
      hourStart,
    )
    if (checkIsAvailable) {
      throw new AppError('Schedule date is not available')
    }
    console.log(hourStart)
    const schedule = await this.scheduleRepository.create({
      name,
      phone,
      date: hourStart,
    })
    return schedule
  }
}
