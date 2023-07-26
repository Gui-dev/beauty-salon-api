import { AppError } from '../errors/app-error'
import { server } from '../shared'

interface IRefreshTokenService {
  refresh_token: string
}

interface IRefreshTokenResponse {
  token: string
  refresh_token: string
}

interface IPayloadTokenResponse {
  email: string
  sub: string
  iat: number
  exp: number
}

export class RefreshTokenService {
  public async execute({
    refresh_token,
  }: IRefreshTokenService): Promise<IRefreshTokenResponse> {
    if (!refresh_token) {
      throw new AppError('Refresh token is missing', 401)
    }
    const verifyRefreshToken = server.jwt.verify(refresh_token)
    const { email, sub } = verifyRefreshToken as IPayloadTokenResponse
    const newToken = server.jwt.sign(
      {
        email,
      },
      {
        sub,
        expiresIn: '15m',
      },
    )
    const refreshToken = server.jwt.sign(
      {
        email,
      },
      {
        sub,
        expiresIn: '7d',
      },
    )

    return {
      token: newToken,
      refresh_token: refreshToken,
    }
  }
}
