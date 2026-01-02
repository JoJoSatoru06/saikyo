import { generateId } from '@common/utils'

import { MUSCLE_GROUPS } from '@modules/muscle-group'

import type { ExerciseModel } from '../model/exercise.model'

const DEFAULT_BACK_EXERCISES: ExerciseModel[] = [
  {
    id: generateId(),
    name: 'Подтягивания на турнике',
    muscleGroup: MUSCLE_GROUPS.back,
    bodyWeight: false,
    doubleWeight: false,
  },
  {
    id: generateId(),
    name: 'Тяга гантели в наклоне',
    muscleGroup: MUSCLE_GROUPS.back,
    bodyWeight: false,
    doubleWeight: true,
  },
]

const DEFAULT_CHEST_EXERCISES: ExerciseModel[] = [
  {
    id: generateId(),
    name: 'Жим гантели лежа',
    muscleGroup: MUSCLE_GROUPS.chest,
    bodyWeight: false,
    doubleWeight: true,
  },
  {
    id: generateId(),
    name: 'Жим гантели лежа на наклонной скамье',
    muscleGroup: MUSCLE_GROUPS.chest,
    bodyWeight: false,
    doubleWeight: true,
  },
  {
    id: generateId(),
    name: 'Жим штанги лежа',
    muscleGroup: MUSCLE_GROUPS.chest,
    bodyWeight: false,
    doubleWeight: false,
  },
  {
    id: generateId(),
    name: 'Жим штанги лежа на наклонной скамье',
    muscleGroup: MUSCLE_GROUPS.chest,
    bodyWeight: false,
    doubleWeight: false,
  },
]

const DEFAULT_SHOULDERS_EXERCISES: ExerciseModel[] = [
  {
    id: generateId(),
    name: 'Махи гантелями в стороны',
    muscleGroup: MUSCLE_GROUPS.shoulders,
    bodyWeight: false,
    doubleWeight: true,
  },
  {
    id: generateId(),
    name: 'Жим гантелей сидя',
    muscleGroup: MUSCLE_GROUPS.shoulders,
    bodyWeight: false,
    doubleWeight: true,
  },
]

const DEFAULT_ARMS_EXERCISES: ExerciseModel[] = [
  {
    id: generateId(),
    name: 'Подъём штанги стоя',
    muscleGroup: MUSCLE_GROUPS.arms,
    bodyWeight: false,
    doubleWeight: false,
  },
  {
    id: generateId(),
    name: 'Французский жим штанги лежа',
    muscleGroup: MUSCLE_GROUPS.arms,
    bodyWeight: false,
    doubleWeight: false,
  },
]

const DEFAULT_ABS_EXERCISES: ExerciseModel[] = [
  {
    id: generateId(),
    name: 'Скручивания',
    muscleGroup: MUSCLE_GROUPS.abs,
    bodyWeight: true,
    doubleWeight: false,
  },
]

const DEFAULT_LEGS_EXERCISES: ExerciseModel[] = [
  {
    id: generateId(),
    name: 'Приседания со штангой',
    muscleGroup: MUSCLE_GROUPS.legs,
    bodyWeight: false,
    doubleWeight: false,
  },
  {
    id: generateId(),
    name: 'Приседания в гаке',
    muscleGroup: MUSCLE_GROUPS.legs,
    bodyWeight: false,
    doubleWeight: false,
  },
  {
    id: generateId(),
    name: 'Болгарские выпады с гантелями',
    muscleGroup: MUSCLE_GROUPS.legs,
    bodyWeight: false,
    doubleWeight: true,
  },
]

export const DEFAULT_EXERCISES: ExerciseModel[] = [
  ...DEFAULT_BACK_EXERCISES,
  ...DEFAULT_CHEST_EXERCISES,
  ...DEFAULT_SHOULDERS_EXERCISES,
  ...DEFAULT_ARMS_EXERCISES,
  ...DEFAULT_ABS_EXERCISES,
  ...DEFAULT_LEGS_EXERCISES,
]
