import { FastifyReply, FastifyRequest } from 'fastify'
import { RefreshTokenService } from '../services/refresh-token-service'
import { refreshTokenValidation } from '../validation/refresh-token-validation'

export class RefreshTokenController {
  public async create(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { refresh_token } = refreshTokenValidation.parse(request.body)
    const refreshTokenService = new RefreshTokenService()
    const refreshToken = await refreshTokenService.execute({ refresh_token })

    return response.status(201).send(refreshToken)
  }
}
