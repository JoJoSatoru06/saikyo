import { queryOptions } from '@tanstack/react-query'

import { workoutService } from '../services/workout.service'

const QUERY_KEYS = {
  getAll: ['workouts'],
} as const

export const workoutQueryOptions = {
  getAll: () =>
    queryOptions({
      queryKey: QUERY_KEYS.getAll,
      queryFn: () => workoutService.getAll(),
    }),
}
