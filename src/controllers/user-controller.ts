import { FastifyRequest, FastifyReply } from 'fastify'

import { CreateUserService } from '../services/create-user-service'
import { createUserValidation } from '../validation/create-user-validation'

export class UsersController {
  public async store(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const { name, email, password } = createUserValidation.parse(request.body)
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ name, email, password })
    return response.status(201).send({ user })
  }
}
