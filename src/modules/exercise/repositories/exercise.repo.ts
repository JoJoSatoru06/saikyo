import { dbPromise } from '@common/api/db-client'

import type { ExerciseModel } from '../model/exercise.model'

export const exerciseRepo = {
  getAll: async () => (await dbPromise).getAll('exercises'),

  getById: async (id: string) => (await dbPromise).get('exercises', id),

  getByName: async (name: string) =>
    (await dbPromise).getAllFromIndex('exercises', 'by-name', name),

  add: async (exercise: ExerciseModel) => (await dbPromise).put('exercises', exercise),

  update: async (id: string, data: Partial<ExerciseModel>) => {
    const db = await dbPromise
    const current = await db.get('exercises', id)

    if (!current) return

    await db.put('exercises', { ...current, ...data })
  },

  delete: async (id: string) => (await dbPromise).delete('exercises', id),
}
