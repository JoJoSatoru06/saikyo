import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useId, type ComponentProps } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {
  Button,
  Form,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@common/components/ui'
import { tryCatch } from '@common/utils/try-catch'

import { ExerciseFormFields } from './exercise-form-fields'
import { exercisesQueryOptions } from '../constants/exercise.query-options'
import { useIsFetchingExercises } from '../hooks/use-is-fetching-exercises'
import { createExerciseDtoSchema } from '../model/create-exercise.dto'
import type { CreateExerciseDto } from '../model/create-exercise.dto'
import type { ExerciseModel } from '../model/exercise.model'
import { exerciseService } from '../services/exercise.service'

interface UpdateExerciseSheetProps extends ComponentProps<typeof Sheet> {
  exercise: ExerciseModel
}

export const UpdateExerciseSheet = ({ exercise, ...props }: UpdateExerciseSheetProps) => {
  return (
    <Sheet {...props}>
      <SheetContent side="bottom" className="h-[80dvh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Изменить упражнение</SheetTitle>
        </SheetHeader>

        <UpdateExerciseForm exercise={exercise} onOpenChange={props?.onOpenChange} />
      </SheetContent>
    </Sheet>
  )
}

const UpdateExerciseForm = ({
  exercise,
  onOpenChange,
}: {
  exercise: ExerciseModel
  onOpenChange?: (open: boolean) => void
}) => {
  const formId = useId()
  const queryClient = useQueryClient()
  const isFetchingExercises = useIsFetchingExercises()
  const { mutateAsync: updateExercise, isPending } = useMutation({
    mutationFn: exerciseService.update,
  })

  const form = useForm<CreateExerciseDto>({
    resolver: zodResolver(createExerciseDtoSchema),
    defaultValues: {
      name: exercise.name,
      muscleGroup: exercise.muscleGroup.value,
      doubleWeight: exercise.doubleWeight,
      bodyWeight: exercise.bodyWeight,
    },
  })

  const handleAddExercise: SubmitHandler<CreateExerciseDto> = async data => {
    const { toast } = await import('sonner')

    const { error: updateExerciseError, response } = await tryCatch(
      updateExercise({ id: exercise.id, dto: data })
    )

    if (updateExerciseError) {
      toast.error(updateExerciseError.message)
      return
    }

    await queryClient.invalidateQueries(exercisesQueryOptions.getAll())

    toast.success(`Упражнение «${response.data.name}» изменено`)

    onOpenChange?.(false)
  }

  return (
    <>
      <ScrollArea className="h-full flex-1 min-h-0">
        <Form {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit(handleAddExercise)}
            className="px-4 space-y-6 h-full flex flex-col"
          >
            <ExerciseFormFields form={form} />
          </form>
        </Form>
      </ScrollArea>
      <SheetFooter className="mt-auto">
        <Button
          className="w-full"
          type="submit"
          loading={isPending || isFetchingExercises}
          form={formId}
        >
          Изменить
        </Button>
      </SheetFooter>
    </>
  )
}
