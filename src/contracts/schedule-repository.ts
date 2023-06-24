import { Schedule } from '@prisma/client'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'
import { IUpdateScheduleDTO } from '../dtos/update-schedule-dto'

export interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>
  findScheduleById(user_id: string, id: string): Promise<Schedule | null>
  findScheduleByDate(user_id: string, date: Date): Promise<Schedule | null>
  findAll(user_id: string, date: Date): Promise<Schedule[] | null>
  update(date: IUpdateScheduleDTO): Promise<Schedule>
}
