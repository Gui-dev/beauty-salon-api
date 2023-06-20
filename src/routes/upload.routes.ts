import { FastifyInstance } from 'fastify'

import { UploadFileController } from '../controllers/upload-file-controller'

const uploadFileController = new UploadFileController()

export const uploadRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post(
    '/uploads',
    {
      onRequest: [app.authenticate],
    },
    uploadFileController.update,
  )
}
