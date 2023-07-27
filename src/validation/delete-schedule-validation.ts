import { z } from 'zod'

export const deleteScheduleParamIdValidation = z.object({
  id: z.string().uuid(),
})
