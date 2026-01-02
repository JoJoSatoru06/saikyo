import { z } from 'zod'

import { MUSCLE_GROUPS } from '@modules/muscle-group'

export const updateExerciseDtoSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Название должно быть от 2 до 50 символов' })
    .max(50, { message: 'Название должно быть от 2 до 50 символов' }),
  muscleGroup: z.literal(
    Object.values(MUSCLE_GROUPS).map(g => g.value),
    { message: 'Группа мышц должна быть выбрана' }
  ),
  bodyWeight: z.boolean(),
  doubleWeight: z.boolean(),
})

export type UpdateExerciseDto = z.infer<typeof updateExerciseDtoSchema>
