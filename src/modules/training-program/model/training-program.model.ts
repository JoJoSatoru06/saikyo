import type { ExerciseModel } from '@modules/exercise'

export interface TrainingProgramModel {
  id: string
  name: string
  exercises: ExerciseModel[]
}
