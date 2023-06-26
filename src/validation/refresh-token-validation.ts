import { z } from 'zod'

export const refreshTokenValidation = z.object({
  refresh_token: z.string(),
})
