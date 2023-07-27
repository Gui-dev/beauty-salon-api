import { IScheduleRepository } from '../contracts/schedule-repository'
import { IDeleteScheduleDTO } from '../dtos/delete-schedule-dto'
import { AppError } from '../errors/app-error'
import { ScheduleRepository } from '../repositories/schedule-repository'

export class DeleteScheduleService {
  private scheduleRepository: IScheduleRepository
  constructor() {
    this.scheduleRepository = new ScheduleRepository()
  }

  public async execute({ user_id, id }: IDeleteScheduleDTO): Promise<void> {
    const scheduleExists = await this.scheduleRepository.findScheduleById(
      user_id,
      id,
    )

    if (!scheduleExists) {
      throw new AppError('Schedule not found', 404)
    }

    if (scheduleExists.user_id !== user_id) {
      throw new AppError('User unauthorized', 401)
    }

    await this.scheduleRepository.delete(id)
  }
}
