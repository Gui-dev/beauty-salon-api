import { Users } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/create-user-dto'
import { prisma } from '../lib/prisma'

import { IUserRepository } from '../contracts/user-repository'

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

  public async findUserByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
