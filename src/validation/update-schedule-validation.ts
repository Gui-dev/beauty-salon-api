import { z } from 'zod'

export const updateScheduleParamIdValidation = z.object({
  id: z.string().uuid(),
})

export const updateScheduleDateValidation = z.object({
  date: z.string().transform((date) => new Date(date)),
})
