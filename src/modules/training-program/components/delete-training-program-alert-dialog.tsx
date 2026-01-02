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

import { trainingProgramQueryOptions } from '../constants/training-program.query-options'
import { useIsFetchingTrainingPrograms } from '../hooks/use-is-fetching-training-programs'
import type { TrainingProgramModel } from '../model/training-program.model'
import { trainingProgramService } from '../services/training-program.service'

interface DeleteTrainingProgramAlertDialogProps extends ComponentProps<typeof AlertDialog> {
  trainingProgram: TrainingProgramModel
}

export const DeleteTrainingProgramAlertDialog = ({
  trainingProgram,
  ...props
}: DeleteTrainingProgramAlertDialogProps) => {
  const queryClient = useQueryClient()
  const isFetchingTrainingPrograms = useIsFetchingTrainingPrograms()
  const { mutateAsync: deleteTrainingProgram, isPending } = useMutation({
    mutationFn: trainingProgramService.delete,
  })

  const handleDeleteTrainingProgram = async () => {
    const { toast } = await import('sonner')

    const { error: deleteTrainingProgramError } = await tryCatch(
      deleteTrainingProgram(trainingProgram.id)
    )

    if (deleteTrainingProgramError) {
      toast.error(deleteTrainingProgramError.message)
      return
    }

    await queryClient.invalidateQueries(trainingProgramQueryOptions.getAll())

    toast.success(`Программа «${trainingProgram.name}» удалена`)
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить программу «{trainingProgram.name}»?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие не может быть отменено. Это удалит программу навсегда.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <Button
            loading={isPending || isFetchingTrainingPrograms}
            onClick={handleDeleteTrainingProgram}
          >
            Удалить
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
