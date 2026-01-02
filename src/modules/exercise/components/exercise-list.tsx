import { useSuspenseQuery } from '@tanstack/react-query'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from '@common/components/ui'

import { MUSCLE_GROUPS_OPTIONS, type MuscleGroupOption } from '@modules/muscle-group'

import { ExerciseCard } from './exercise-card'
import { exercisesQueryOptions } from '../constants/exercise.query-options'

export const ExerciseList = () => {
  const exercisesQuery = useSuspenseQuery(exercisesQueryOptions.getAll())

  const findGroupExercises = (group: MuscleGroupOption) => {
    return exercisesQuery.data?.filter(ex => ex.muscleGroup.value === group.value) ?? []
  }

  return (
    <>
      <Accordion type="multiple" className="w-full space-y-2">
        {MUSCLE_GROUPS_OPTIONS.map(group => {
          const groupExercises = findGroupExercises(group)

          return (
            <AccordionItem
              key={group.value}
              value={group.value}
              className="border rounded-lg px-2 bg-card"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{group.label}</span>

                  <Badge variant="secondary">{groupExercises.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-2">
                {groupExercises.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Нет упражнений в этой группе
                  </p>
                ) : (
                  groupExercises.map(exercise => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  ))
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}
