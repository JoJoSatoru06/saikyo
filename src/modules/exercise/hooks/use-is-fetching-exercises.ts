import { useIsFetching } from '@tanstack/react-query'

import { exercisesQueryOptions } from '../constants/exercise.query-options'

export const useIsFetchingExercises = () => useIsFetching(exercisesQueryOptions.getAll()) > 0
