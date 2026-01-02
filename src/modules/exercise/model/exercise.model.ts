import type { MuscleGroupOption } from '@modules/muscle-group'

export interface ExerciseSetModel {
  weight: number
  reps: number
}

export interface ExerciseModel {
  id: string
  name: string
  muscleGroup: MuscleGroupOption
  bodyWeight: boolean
  doubleWeight: boolean
}
