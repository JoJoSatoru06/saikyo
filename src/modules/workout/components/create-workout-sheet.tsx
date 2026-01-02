import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import {
  Button,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@common/components/ui'
import { LoadingOverlay } from '@common/components/ui/loading-overlay'
import { tryCatch } from '@common/utils/try-catch'

import {
  TrainingProgramMiniCard,
  trainingProgramQueryOptions,
  type TrainingProgramModel,
} from '@modules/training-program'

import { workoutQueryOptions } from '../constants/workout.query-options'
import { useIsFetchingWorkouts } from '../hooks/use-is-fetching-workouts'
import { workoutService } from '../services/workout.service'

interface CreateWorkoutSheetProps {
  date: Date
}

export const CreateWorkoutSheet = ({ date }: CreateWorkoutSheetProps) => {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const isFetchingTrainingPrograms = useIsFetchingWorkouts()
  const createWorkoutMutation = useMutation({
    mutationFn: workoutService.create,
  })

  const trainingProgramsQuery = useSuspenseQuery(trainingProgramQueryOptions.getAll())

  const handleSelectProgram = async (trainingProgram: TrainingProgramModel) => {
    const { toast } = await import('sonner')

    const { error } = await tryCatch(
      createWorkoutMutation.mutateAsync({
        date: date.toISOString(),
        programId: trainingProgram.id,
      })
    )

    if (error) {
      toast.error(error.message)
      return
    }

    await queryClient.invalidateQueries(workoutQueryOptions.getAll())

    toast.success(`Тренировка от ${format(date, 'd MMMM, EEEE', { locale: ru })} создана`)

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <PlusIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[50vh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Выберите программу</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-full flex-1 min-h-0 p-4 relative">
          <LoadingOverlay show={createWorkoutMutation.isPending || isFetchingTrainingPrograms} />

          <div className="grid gap-3">
            {trainingProgramsQuery.data.data?.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Сначала создайте программу во вкладке &quot;Программы&quot;
              </p>
            ) : (
              trainingProgramsQuery.data.data?.map(program => (
                <TrainingProgramMiniCard
                  key={program.id}
                  trainingProgram={program}
                  onClick={() => handleSelectProgram(program)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
