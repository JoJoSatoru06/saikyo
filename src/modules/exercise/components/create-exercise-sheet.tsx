import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
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
  SheetTrigger,
} from '@common/components/ui'
import { tryCatch } from '@common/utils/try-catch'

import { MUSCLE_GROUPS } from '@modules/muscle-group'

import { ExerciseFormFields } from './exercise-form-fields'
import { exercisesQueryOptions } from '../constants/exercise.query-options'
import { useIsFetchingExercises } from '../hooks/use-is-fetching-exercises'
import { createExerciseDtoSchema } from '../model/create-exercise.dto'
import type { CreateExerciseDto } from '../model/create-exercise.dto'
import { exerciseService } from '../services/exercise.service'

export const CreateExerciseSheet = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
        <SheetHeader className="border-b">
          <SheetTitle>Добавить упражнение</SheetTitle>
        </SheetHeader>

        <CreateExerciseForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  )
}

const CreateExerciseForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const formId = useId()
  const queryClient = useQueryClient()
  const isFetchingExercises = useIsFetchingExercises()

  const { mutateAsync: createExercise, isPending } = useMutation({
    mutationFn: exerciseService.create,
  })

  const form = useForm<CreateExerciseDto>({
    resolver: zodResolver(createExerciseDtoSchema),
    defaultValues: {
      name: '',
      muscleGroup: MUSCLE_GROUPS.chest.value,
      doubleWeight: false,
      bodyWeight: false,
    },
  })

  const handleAddExercise: SubmitHandler<CreateExerciseDto> = async data => {
    const { toast } = await import('sonner')

    const { error: createExerciseError, response } = await tryCatch(createExercise(data))

    if (createExerciseError) {
      toast.error(createExerciseError.message)
      return
    }

    await queryClient.invalidateQueries(exercisesQueryOptions.getAll())

    toast.success(`Упражнение «${response.data.name}» добавлено`)

    setOpen(false)
  }

  return (
    <>
      <ScrollArea className="h-full flex-1 min-h-0">
        <Form {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit(handleAddExercise)}
            className="px-4 h-full flex flex-col gap-6"
          >
            <ExerciseFormFields form={form} />
          </form>
        </Form>
      </ScrollArea>

      <SheetFooter className="border-t">
        <Button
          className="w-full"
          type="submit"
          loading={isPending || isFetchingExercises}
          form={formId}
        >
          Сохранить
        </Button>
      </SheetFooter>
    </>
  )
}
