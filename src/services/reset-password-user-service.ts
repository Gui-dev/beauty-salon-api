import { Users } from '@prisma/client'

import { AppError } from '../errors/app-error'
import { IUserRepository } from '../contracts/user-repository'
import { UserRepository } from '../repositories/user-repository'
import { HashProvider } from '../providers/hash-provider'

interface IUpdateUserService {
  user_id: string
  password: string
}

export class ResetPasswordUserService {
  private userRepository: IUserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute({
    user_id,
    password,
  }: IUpdateUserService): Promise<Omit<Users, 'password'>> {
    if (!user_id) {
      throw new AppError('User unauthorized', 401)
    }
    const hashPassword = await HashProvider.generateHash(password)
    const user = await this.userRepository.updateUser({
      user_id,
      password: hashPassword,
    })

    return user
  }
}
