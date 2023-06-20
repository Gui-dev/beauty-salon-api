import { Users } from '@prisma/client'

import { IUserRepository } from '../contracts/user-repository'
import { ICreateUserDTO } from '../dtos/create-user-dto'
import { IResetPasswordUserDTO } from '../dtos/reset-password-user-dto'
import { prisma } from '../lib/prisma'

export class UserRepository implements IUserRepository {
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Omit<Users, 'avatar_url' | 'password'>> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  }

  public async findUserById(user_id: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: {
        id: user_id,
      },
    })
    return user
  }

  public async findUserByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  public async updateUser({
    user_id,
    password,
  }: IResetPasswordUserDTO): Promise<Omit<Users, 'password'>> {
    const user = await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_url: true,
      },
    })

    return user
  }
}
