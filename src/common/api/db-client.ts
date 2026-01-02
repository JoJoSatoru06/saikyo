import { openDB, type DBSchema } from 'idb'

import type { ExerciseModel } from '@modules/exercise'
import { DEFAULT_EXERCISES } from '@modules/exercise/constants/default-exercises.constants'
import type { TrainingProgramModel } from '@modules/training-program'
import type { WorkoutModel } from '@modules/workout'

export interface AppDB extends DBSchema {
  exercises: {
    key: string
    value: ExerciseModel
    indexes: { 'by-name': string }
  }

  trainingPrograms: {
    key: string
    value: TrainingProgramModel
  }

  workouts: {
    key: string
    value: WorkoutModel
    indexes: { 'by-date': string }
  }
}

export const dbPromise = openDB<AppDB>('app-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('exercises')) {
      const store = db.createObjectStore('exercises', { keyPath: 'id' })
      store.createIndex('by-name', 'name')

      for (const exercise of DEFAULT_EXERCISES) {
        store.add(exercise)
      }
    }

    if (!db.objectStoreNames.contains('trainingPrograms')) {
      db.createObjectStore('trainingPrograms', { keyPath: 'id' })
    }

    if (!db.objectStoreNames.contains('workouts')) {
      const store = db.createObjectStore('workouts', { keyPath: 'id' })
      store.createIndex('by-date', 'date')
    }
  },
})
