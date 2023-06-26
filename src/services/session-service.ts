import { server } from './../shared'
import { ISessionDTO } from '../dtos/session-dto'
import { IUserRepository } from '../contracts/user-repository'
import { UserRepository } from '../repositories/user-repository'
import { AppError } from '../errors/app-error'
import { HashProvider } from '../providers/hash-provider'

interface ISessionServiceResponse {
  user: {
    id: string
    name: string
    email: string
    avatar_url: string | null
  }
  token: string
  refresh_token: string
}

export class SessionService {
  private userRepository: IUserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute({
    email,
    password,
  }: ISessionDTO): Promise<ISessionServiceResponse> {
    const userExists = await this.userRepository.findUserByEmail(email)
    if (!userExists) {
      throw new AppError('Email or password invalid', 401)
    }
    if (!(await HashProvider.compareHash(password, userExists.password))) {
      throw new AppError('Email or password invalid password', 401)
    }

    const token = server.jwt.sign(
      {
        email: userExists.email,
      },
      {
        sub: userExists.id,
        expiresIn: '15m',
      },
    )

    const refreshToken = server.jwt.sign(
      {
        email: userExists.email,
      },
      {
        sub: userExists.id,
        expiresIn: '7d',
      },
    )

    return {
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        avatar_url: userExists.avatar_url,
      },
      token,
      refresh_token: refreshToken,
    }
  }
}
