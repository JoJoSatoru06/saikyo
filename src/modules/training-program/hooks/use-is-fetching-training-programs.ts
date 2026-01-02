import { useIsFetching } from '@tanstack/react-query'

import { trainingProgramQueryOptions } from '../constants/training-program.query-options'
export const useIsFetchingTrainingPrograms = () =>
  useIsFetching(trainingProgramQueryOptions.getAll()) > 0
