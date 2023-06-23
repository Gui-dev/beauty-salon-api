import { Schedule } from '@prisma/client'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'
import { IUpdateScheduleDTO } from '../dtos/update-schedule-dto'

export interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>
  findScheduleById(id: string): Promise<Schedule | null>
  findScheduleByDate(date: Date): Promise<Schedule | null>
  findAll(date: Date): Promise<Schedule[] | null>
  update(date: IUpdateScheduleDTO): Promise<Schedule>
}
