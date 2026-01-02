import { queryOptions } from '@tanstack/react-query'

import { exerciseService } from '../services/exercise.service'

const QUERY_KEYS = {
  getAll: ['exercises'],
  getById: (id: string) => [...QUERY_KEYS.getAll, id],
} as const

export const exercisesQueryOptions = {
  getAll: () =>
    queryOptions({
      queryKey: QUERY_KEYS.getAll,
      queryFn: async () => (await exerciseService.getAll()).data,
    }),
}
