import { queryOptions } from '@tanstack/react-query'

import { trainingProgramService } from '../services/training-program.service'

const QUERY_KEYS = {
  getAll: ['trainingPrograms'],
} as const

export const trainingProgramQueryOptions = {
  getAll: () =>
    queryOptions({
      queryKey: QUERY_KEYS.getAll,
      queryFn: () => trainingProgramService.getAll(),
    }),
}
