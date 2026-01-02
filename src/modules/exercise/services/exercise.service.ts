import type { Response } from '@common/types'
import { delay, generateId } from '@common/utils'

import { MUSCLE_GROUPS } from '@modules/muscle-group'

import { createExerciseDtoSchema, type CreateExerciseDto } from '../model/create-exercise.dto'
import type { ExerciseModel } from '../model/exercise.model'
import { updateExerciseDtoSchema, type UpdateExerciseDto } from '../model/update-exercise.dto'
import { exerciseRepo } from '../repositories/exercise.repo'

export const exerciseService = {
  async create(dto: CreateExerciseDto): Promise<Response<ExerciseModel>> {
    const result = createExerciseDtoSchema.safeParse(dto)

    if (!result.success) {
      throw new Error(result.error.message)
    }

    const exercise: ExerciseModel = {
      ...result.data,
      id: generateId(),
      muscleGroup: MUSCLE_GROUPS[result.data.muscleGroup],
    }

    await Promise.all([exerciseRepo.add(exercise), delay()])

    return {
      data: exercise,
    }
  },

  async update({
    id,
    dto,
  }: {
    id: string
    dto: UpdateExerciseDto
  }): Promise<Response<ExerciseModel>> {
    const exercise = await exerciseRepo.getById(id)

    if (!exercise) {
      throw new Error('Упражнение не найдено')
    }

    const result = updateExerciseDtoSchema.safeParse(dto)

    if (!result.success) {
      throw new Error(result.error.message)
    }

    const updatedExercise: ExerciseModel = {
      ...exercise,
      ...result.data,
      muscleGroup: MUSCLE_GROUPS[result.data.muscleGroup],
    }

    await Promise.all([exerciseRepo.update(id, updatedExercise), delay()])

    return { data: updatedExercise }
  },

  async delete(id: string): Promise<Response> {
    await Promise.all([exerciseRepo.delete(id), delay()])

    return { data: null }
  },

  async getAll(): Promise<Response<ExerciseModel[]>> {
    const [exercises] = await Promise.all([exerciseRepo.getAll(), delay()])

    return { data: exercises }
  },

  async getById(id: string): Promise<Response<ExerciseModel>> {
    const exercise = await exerciseRepo.getById(id)

    if (!exercise) {
      throw new Error('Упражнение не найдено')
    }

    return { data: exercise }
  },
}
