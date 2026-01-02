import { z } from 'zod'

export const createWorkoutDtoSchema = z.object({
  date: z.iso.datetime(),
  programId: z.string(),
})

export type CreateWorkoutDto = z.infer<typeof createWorkoutDtoSchema>
