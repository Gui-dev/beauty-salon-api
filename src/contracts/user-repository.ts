import { Users } from '@prisma/client'

import { ICreateUserDTO } from '../dtos/create-user-dto'

export interface IUserRepository {
  create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Omit<Users, 'avatar_url' | 'password'>>
  findUserByEmail(email: string): Promise<Users | null>
}
