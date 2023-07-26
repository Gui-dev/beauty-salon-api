import { Users } from '@prisma/client'

import { ICreateUserDTO } from '../dtos/create-user-dto'
import { IResetPasswordUserDTO } from '../dtos/reset-password-user-dto'
import { IUpdateAvatarDTO } from '../dtos/update-avatar-dto'

export interface IUserRepository {
  create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Omit<Users, 'avatar_url' | 'password'>>
  findUserById(user_id: string): Promise<Users | null>
  findUserByEmail(email: string): Promise<Users | null>
  updateUser({
    password,
  }: IResetPasswordUserDTO): Promise<Omit<Users, 'password'>>
  updateUserAvatar({
    user_id,
    avatar_url,
  }: IUpdateAvatarDTO): Promise<Omit<Users, 'password'>>
}
