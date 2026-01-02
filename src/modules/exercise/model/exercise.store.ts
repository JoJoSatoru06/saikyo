import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExerciseStore {
  // exercises: ExerciseModel[]
  count: number

  // addExercise: (exercise: ExerciseModel) => void
  // updateExercise: (id: string, exercise: Partial<ExerciseModel>) => void
  // deleteExercise: (id: string) => void
}

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    () => ({
      count: 0,
      // exercises: [DEFAULT_EXERCISES[0]],
      // addExercise: exercise => set(state => ({ exercises: [...state.exercises, exercise] })),
      // updateExercise: (id, exerciseUpdate) =>
      //   set(state => ({
      //     exercises: state.exercises.map(ex => (ex.id === id ? { ...ex, ...exerciseUpdate } : ex)),
      //   })),
      // deleteExercise: id =>
      //   set(state => ({
      //     exercises: state.exercises.filter(ex => ex.id !== id),
      //   })),
    }),
    {
      name: 'exercise-storage',
    }
  )
)
