import { z } from 'zod'

export const createScheduleValidation = z.object({
  name: z.string(),
  phone: z.string(),
  date: z.string().transform((date) => new Date(date)),
})
