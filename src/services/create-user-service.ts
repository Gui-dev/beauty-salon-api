import { Users } from '@prisma/client'

import { ICreateUserDTO } from '../dtos/create-user-dto'
import { AppError } from '../errors/app-error'
import { UserRepository } from '../repositories/user-repository'
import { HashProvider } from '../providers/hash-provider'
import { IUserRepository } from '../contracts/user-repository'

export class CreateUserService {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Omit<Users, 'avatar_url' | 'password'>> {
    const findUser = await this.userRepository.findUserByEmail(email)
    if (findUser) {
      throw new AppError('User already exists', 409)
    }
    const hashPassword = await HashProvider.generateHash(password)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    })

    return user
  }
}
