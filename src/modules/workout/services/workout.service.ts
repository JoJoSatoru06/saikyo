import type { Response } from '@common/types'
import { delay, generateId } from '@common/utils'

import { trainingProgramService } from '@modules/training-program/services/training-program.service'

import { createWorkoutDtoSchema, type CreateWorkoutDto } from '../model/create-workout.dto'
import type { WorkoutExerciseModel } from '../model/workout-exercise.model'
import type { WorkoutModel } from '../model/workout.model'
import { workoutRepo } from '../repositories/workout.repo'

export const workoutService = {
  getAll: async (): Promise<Response<WorkoutModel[]>> => {
    const [workouts] = await Promise.all([workoutRepo.getAll(), delay()])
    return { data: workouts }
  },

  create: async (dto: CreateWorkoutDto): Promise<Response<WorkoutModel>> => {
    const result = createWorkoutDtoSchema.safeParse(dto)

    if (!result.success) {
      throw new Error(result.error.message)
    }

    const trainingProgramResult = await trainingProgramService.getById(result.data.programId)

    const exercisesWithSets: WorkoutExerciseModel[] = trainingProgramResult.data.exercises.map(
      exercise => ({
        ...exercise,
        sets: [],
      })
    )

    const workout: WorkoutModel = {
      id: generateId(),
      date: result.data.date,
      trainingProgram: trainingProgramResult.data,
      exercises: exercisesWithSets,
    }

    await Promise.all([workoutRepo.add(workout), delay()])

    return { data: workout }
  },
}
