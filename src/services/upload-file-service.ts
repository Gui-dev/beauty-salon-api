import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { Users } from '@prisma/client'

import { AppError } from '../errors/app-error'
import { IUserRepository } from '../contracts/user-repository'
import { UserRepository } from '../repositories/user-repository'

interface IUploadUserAvatarService {
  user_id: string
  file: any
  filename: string
  mimetype: string
  request: FastifyRequest
}

export class UploadUserAvatarService {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async execute(
    data: IUploadUserAvatarService,
  ): Promise<Omit<Users, 'password'> | AppError> {
    if (!data.file) {
      return new AppError('File is required', 400)
    }

    const pump = promisify(pipeline)
    const mimeTypeRegex = /^(image)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(data.mimetype)

    if (!isValidFileFormat) {
      return new AppError('File format is invalid', 400)
    }
    const newFileName = randomUUID()
    const extension = extname(data.filename)
    const fileName = newFileName.concat(extension)
    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )
    await pump(data.file, writeStream)
    const fullUrl = data.request.protocol
      .concat('://')
      .concat(data.request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    const user = await this.userRepository.updateUserAvatar({
      user_id: data.user_id,
      avatar_url: fileUrl,
    })

    return user
  }
}
