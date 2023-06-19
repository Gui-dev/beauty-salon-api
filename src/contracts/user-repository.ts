import { Users } from '@prisma/client'

import { ICreateUserDTO } from '../dtos/create-user-dto'
import { IResetPasswordUserDTO } from '../dtos/reset-password-user-dto'

export interface IUserRepository {
  create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Omit<Users, 'avatar_url' | 'password'>>
  findUserById(user_id: string): Promise<Omit<Users, 'password'> | null>
  findUserByEmail(email: string): Promise<Omit<Users, 'password'> | null>
  updateUser({
    password,
  }: IResetPasswordUserDTO): Promise<Omit<Users, 'password'>>
}
