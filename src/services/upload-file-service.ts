import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

import { AppError } from '../errors/app-error'
import { prisma } from '../lib/prisma'

interface IUploadUserAvatarService {
  user_id: string
  file: any
  filename: string
  mimetype: string
  request: FastifyRequest
}

export class UploadUserAvatarService {
  public async execute(
    data: IUploadUserAvatarService,
  ): Promise<void | AppError> {
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

    await prisma.users.update({
      where: {
        id: data.user_id,
      },
      data: {
        avatar_url: fileUrl,
      },
    })
  }
}
