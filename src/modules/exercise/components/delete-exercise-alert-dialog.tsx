import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ComponentProps } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from '@common/components/ui'
import { tryCatch } from '@common/utils/try-catch'

import { exercisesQueryOptions } from '../constants/exercise.query-options'
import { useIsFetchingExercises } from '../hooks/use-is-fetching-exercises'
import type { ExerciseModel } from '../model/exercise.model'
import { exerciseService } from '../services/exercise.service'

interface DeleteExerciseAlertDialogProps extends ComponentProps<typeof AlertDialog> {
  exercise: ExerciseModel
}

export const DeleteExerciseAlertDialog = ({
  exercise,
  ...props
}: DeleteExerciseAlertDialogProps) => {
  const queryClient = useQueryClient()
  const isFetchingExercises = useIsFetchingExercises()
  const { mutateAsync: deleteExercise, isPending } = useMutation({
    mutationFn: exerciseService.delete,
  })

  const handleDeleteExercise = async () => {
    const { toast } = await import('sonner')

    const { error: deleteExerciseError } = await tryCatch(deleteExercise(exercise.id))

    if (deleteExerciseError) {
      toast.error(deleteExerciseError.message)
      return
    }

    await queryClient.invalidateQueries(exercisesQueryOptions.getAll())

    toast.success(`Упражнение «${exercise.name}» удалено`)
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить упражнение «{exercise.name}»?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие не может быть отменено. Это удалит упражнение навсегда.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <Button loading={isPending || isFetchingExercises} onClick={handleDeleteExercise}>
            Удалить
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
