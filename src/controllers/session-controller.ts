import { FastifyReply, FastifyRequest } from 'fastify'
import { sessionValidation } from '../validation/session-validation'
import { SessionService } from '../services/session-service'

export class SessionController {
  public async store(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { email, password } = sessionValidation.parse(request.body)
    const sessionService = new SessionService()
    const user = await sessionService.execute({
      email,
      password,
    })
    return response.status(201).send(user)
  }
}
