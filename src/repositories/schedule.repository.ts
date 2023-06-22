import { Schedule } from '@prisma/client'

import { IScheduleRepository } from '../contracts/schedule-repository'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'
import { prisma } from '../lib/prisma'

export class ScheduleRepository implements IScheduleRepository {
  public async create({
    name,
    phone,
    date,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = await prisma.schedule.create({
      data: {
        name,
        phone,
        date,
      },
    })
    return schedule
  }

  public async findScheduleByDate(date: Date): Promise<Schedule | null> {
    const schedule = await prisma.schedule.findFirst({
      where: {
        date,
      },
    })

    return schedule
  }
}
