import { useSuspenseQuery } from '@tanstack/react-query'

import { TrainingProgramCard } from './training-program-card'
import { trainingProgramQueryOptions } from '../constants/training-program.query-options'

export const TrainingProgramList = () => {
  const trainingProgramsQuery = useSuspenseQuery(trainingProgramQueryOptions.getAll())

  const trainingPrograms = trainingProgramsQuery.data.data

  return (
    <>
      <div className="grid gap-4">
        {trainingPrograms.map(trainingProgram => (
          <TrainingProgramCard key={trainingProgram.id} trainingProgram={trainingProgram} />
        ))}
      </div>
    </>
  )
}
