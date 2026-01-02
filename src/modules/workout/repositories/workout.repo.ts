import { dbPromise } from '@common/api/db-client'

import type { WorkoutModel } from '../model/workout.model'

export const workoutRepo = {
  getAll: async () => (await dbPromise).getAll('workouts'),

  getByDate: async (date: string) => (await dbPromise).getAllFromIndex('workouts', 'by-date', date),

  add: async (workout: WorkoutModel) => (await dbPromise).put('workouts', workout),

  delete: async (id: string) => (await dbPromise).delete('workouts', id),
}
