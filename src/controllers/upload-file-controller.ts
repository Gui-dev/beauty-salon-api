import { FastifyRequest, FastifyReply } from 'fastify'
import { UploadUserAvatarService } from '../services/upload-file-service'

export class UploadFileController {
  public async update(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const user_id = request.user.sub
    const data = await request.file({
      limits: {
        fileSize: 5_242_880, // 5MB
      },
    })

    if (!data) {
      return response.status(400).send({ error: 'File is required' })
    }

    const uploadFile = {
      user_id,
      file: data?.file,
      mimetype: data?.mimetype,
      filename: data.filename,
      request,
    }

    const uploadUserAvatarService = new UploadUserAvatarService()
    const fileUrl = await uploadUserAvatarService.execute(uploadFile)

    return response.status(201).send(fileUrl)
  }
}
