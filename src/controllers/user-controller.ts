import { FastifyRequest, FastifyReply } from 'fastify'

import { CreateUserService } from '../services/create-user-service'
import { createUserValidation } from '../validation/create-user-validation'
import { resetPasswordUserValidation } from '../validation/reset-password-user-validation'
import { ResetPasswordUserService } from '../services/reset-password-user-service'

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

  public async update(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    // await request.jwtVerify()
    // const user_id = request.user.sub
    const user_id = '2a879b9b-bdea-43b6-a296-181474044094'
    const { password } = resetPasswordUserValidation.parse(request.body)
    const resetPasswordUserService = new ResetPasswordUserService()
    const user = await resetPasswordUserService.execute({
      user_id,
      password,
    })
    return response.status(201).send(user)
  }
}
