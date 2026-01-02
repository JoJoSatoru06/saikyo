import { useIsFetching } from '@tanstack/react-query'

import { workoutQueryOptions } from '../constants/workout.query-options'

export const useIsFetchingWorkouts = () => useIsFetching(workoutQueryOptions.getAll()) > 0
