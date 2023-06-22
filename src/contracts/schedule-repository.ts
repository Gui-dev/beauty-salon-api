import { Schedule } from '@prisma/client'
import { ICreateScheduleDTO } from '../dtos/create-schedule-dto'

export interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>
  findScheduleByDate(date: Date): Promise<Schedule | null>
}
