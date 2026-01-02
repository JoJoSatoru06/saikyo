import type { ExerciseModel, ExerciseSetModel } from '@modules/exercise'

export interface WorkoutExerciseModel extends ExerciseModel {
  sets: ExerciseSetModel[]
}
