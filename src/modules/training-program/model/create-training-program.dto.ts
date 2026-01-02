import { z } from 'zod'

export const createTrainingProgramDtoSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Название должно быть от 2 до 50 символов' })
    .max(50, { message: 'Название должно быть от 2 до 50 символов' }),
  exerciseIds: z.array(z.string()).min(1, { message: 'Выберите хотя бы одно упражнение' }),
})

export type CreateTrainingProgramDto = z.infer<typeof createTrainingProgramDtoSchema>
