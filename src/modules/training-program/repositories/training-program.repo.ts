import { dbPromise } from '@common/api/db-client'

import type { TrainingProgramModel } from '../model/training-program.model'

export const trainingProgramRepo = {
  getAll: async () => (await dbPromise).getAll('trainingPrograms'),

  getById: async (id: string) => (await dbPromise).get('trainingPrograms', id),

  add: async (program: TrainingProgramModel) => (await dbPromise).put('trainingPrograms', program),

  update: async (id: string, data: Partial<TrainingProgramModel>) => {
    const db = await dbPromise
    const current = await db.get('trainingPrograms', id)

    if (!current) return

    await db.put('trainingPrograms', { ...current, ...data })
  },

  delete: async (id: string) => (await dbPromise).delete('trainingPrograms', id),
}
