import { z } from 'zod'

export const listScheduleValidation = z.object({
  date: z
    .string()
    .transform((date) => new Date(date))
    .optional(),
})
