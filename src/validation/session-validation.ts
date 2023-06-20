import { z } from 'zod'

export const sessionValidation = z.object({
  email: z.string().email(),
  password: z.string(),
})
