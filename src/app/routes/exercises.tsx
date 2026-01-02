import { createFileRoute } from '@tanstack/react-router'

import { PageLoader } from '@common/components/ui'
import { APP_CONSTANTS } from '@common/constants'

import { ExerciseList, exercisesQueryOptions, CreateExerciseSheet } from '@modules/exercise'

const RouteComponent = () => {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between sticky top-0 bg-background z-10 py-4">
        <h1 className="text-h2">Упражнения</h1>
        <CreateExerciseSheet />
      </div>

      <ExerciseList />
    </div>
  )
}

export const Route = createFileRoute('/exercises')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(exercisesQueryOptions.getAll())
  },
  pendingComponent: () => <PageLoader />,
  component: RouteComponent,
  pendingMs: APP_CONSTANTS.PAGE_PENDING_MS,
})
