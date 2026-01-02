import { createFileRoute } from '@tanstack/react-router'

import { PageLoader } from '@common/components/ui'
import { APP_CONSTANTS } from '@common/constants'

import {
  CreateTrainingProgramSheet,
  TrainingProgramList,
  trainingProgramQueryOptions,
} from '@modules/training-program'

const RouteComponent = () => {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between sticky top-0 bg-background z-10 py-4">
        <h1 className="text-h2">Программы тренировок</h1>

        <CreateTrainingProgramSheet />
      </div>

      <TrainingProgramList />
    </div>
  )
}

export const Route = createFileRoute('/programs')({
  pendingComponent: () => <PageLoader />,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(trainingProgramQueryOptions.getAll())
  },
  component: RouteComponent,
  pendingMs: APP_CONSTANTS.PAGE_PENDING_MS,
})
