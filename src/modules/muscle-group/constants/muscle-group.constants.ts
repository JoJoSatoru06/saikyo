import { mapObjectToOptions } from '@common/utils'

export const MUSCLE_GROUPS = {
  back: {
    label: 'Спина',
    value: 'back',
  },
  chest: {
    label: 'Грудь',
    value: 'chest',
  },
  shoulders: {
    label: 'Плечи',
    value: 'shoulders',
  },
  arms: {
    label: 'Руки',
    value: 'arms',
  },
  abs: {
    label: 'Пресс',
    value: 'abs',
  },
  legs: {
    label: 'Ноги',
    value: 'legs',
  },
} as const

export const MUSCLE_GROUPS_OPTIONS = mapObjectToOptions(MUSCLE_GROUPS)

export type MuscleGroupOption = (typeof MUSCLE_GROUPS_OPTIONS)[number]
