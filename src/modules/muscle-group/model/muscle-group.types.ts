import type { MUSCLE_GROUPS_OPTIONS } from '../constants/muscle-group.constants'

export type MuscleGroupOption = (typeof MUSCLE_GROUPS_OPTIONS)[number]
export type MuscleGroupValue = MuscleGroupOption['value']
