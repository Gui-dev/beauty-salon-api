import { Schedule } from '@prisma/client'
import { endOfDay, startOfDay } from 'date-fns'

import { IScheduleRepository } from '../contracts/schedule-repository'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'
import { prisma } from '../lib/prisma'
import { IUpdateScheduleDTO } from '../dtos/update-schedule-dto'

export class ScheduleRepository implements IScheduleRepository {
  public async create({
    user_id,
    name,
    phone,
    date,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = await prisma.schedule.create({
      data: {
        user_id,
        name,
        phone,
        date,
      },
    })
    return schedule
  }

  public async findScheduleById(
    user_id: string,
    id: string,
  ): Promise<Schedule | null> {
    const schedule = await prisma.schedule.findFirst({
      where: {
        user_id,
        id,
      },
    })

    return schedule
  }

  public async findScheduleByDate(
    user_id: string,
    date: Date,
  ): Promise<Schedule | null> {
    const schedule = await prisma.schedule.findFirst({
      where: {
        user_id,
        date,
      },
    })

    return schedule
  }

  public async findAll(
    user_id: string,
    date: Date,
  ): Promise<Schedule[] | null> {
    const schedules = await prisma.schedule.findMany({
      where: {
        user_id,
        date: {
          gte: startOfDay(date),
          lt: endOfDay(date),
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    return schedules
  }

  public async update({ id, date }: IUpdateScheduleDTO): Promise<Schedule> {
    const schedule = await prisma.schedule.update({
      where: {
        id,
      },
      data: {
        date,
      },
    })

    return schedule
  }
}
