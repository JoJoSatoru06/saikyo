import { z } from 'zod'

export const updateTrainingProgramDtoSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Название должно быть от 2 до 50 символов' })
    .max(50, { message: 'Название должно быть от 2 до 50 символов' }),
  exerciseIds: z.array(z.string()).min(1, { message: 'Выберите хотя бы одно упражнение' }),
})

export type UpdateTrainingProgramDto = z.infer<typeof updateTrainingProgramDtoSchema>
