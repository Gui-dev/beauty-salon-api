import { FastifyRequest, FastifyReply } from 'fastify'

export class UsersController {
  public async create(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    return response.status(200).send({ message: 'Hello World' })
  }
}
