import type { TrainingProgramModel } from '@modules/training-program'

import type { WorkoutExerciseModel } from './workout-exercise.model'

export interface WorkoutModel {
  id: string
  date: string
  trainingProgram: TrainingProgramModel
  exercises: WorkoutExerciseModel[]
}
