import type { Response } from '@common/types'
import { delay, generateId } from '@common/utils'

import { exerciseService } from '@modules/exercise'

import {
  createTrainingProgramDtoSchema,
  type CreateTrainingProgramDto,
} from '../model/create-training-program.dto'
import type { TrainingProgramModel } from '../model/training-program.model'
import { updateTrainingProgramDtoSchema } from '../model/update-training-program.dto'
import { trainingProgramRepo } from '../repositories/training-program.repo'

export const trainingProgramService = {
  getAll: async (): Promise<Response<TrainingProgramModel[]>> => {
    const [trainingPrograms] = await Promise.all([trainingProgramRepo.getAll(), delay()])

    return { data: trainingPrograms }
  },

  getById: async (id: string): Promise<Response<TrainingProgramModel>> => {
    const trainingProgram = await trainingProgramRepo.getById(id)

    if (!trainingProgram) {
      throw new Error('Программа не найдена')
    }

    return { data: trainingProgram }
  },

  create: async (dto: CreateTrainingProgramDto): Promise<Response<TrainingProgramModel>> => {
    const result = createTrainingProgramDtoSchema.safeParse(dto)

    if (!result.success) {
      throw new Error(result.error.message)
    }

    const exerciseResults = await Promise.all(
      result.data.exerciseIds.map(id => exerciseService.getById(id))
    )

    const exercises = exerciseResults.map(result => result.data)

    const trainingProgram: TrainingProgramModel = {
      id: generateId(),
      name: result.data.name,
      exercises,
    }

    await Promise.all([trainingProgramRepo.add(trainingProgram), delay()])

    return { data: trainingProgram }
  },

  update: async ({
    id,
    dto,
  }: {
    id: string
    dto: CreateTrainingProgramDto
  }): Promise<Response<TrainingProgramModel>> => {
    const trainingProgram = await trainingProgramRepo.getById(id)

    if (!trainingProgram) {
      throw new Error('Программа не найдена')
    }

    const result = updateTrainingProgramDtoSchema.safeParse(dto)

    if (!result.success) {
      throw new Error(result.error.message)
    }

    const updatedTrainingProgram: TrainingProgramModel = {
      ...trainingProgram,
      ...result.data,
    }

    await Promise.all([trainingProgramRepo.update(id, trainingProgram), delay()])

    return { data: updatedTrainingProgram }
  },

  delete: async (id: string): Promise<Response> => {
    await Promise.all([trainingProgramRepo.delete(id), delay()])

    return { data: null }
  },
}
