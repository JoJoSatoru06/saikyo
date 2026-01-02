import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {
  Badge,
  Button,
  Form,
  Skeleton,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@common/components/ui'
import { tryCatch } from '@common/utils/try-catch'

import {
  exercisesQueryOptions,
  SelectableExerciseCard,
  type ExerciseModel,
} from '@modules/exercise'

import { trainingProgramQueryOptions } from '../constants/training-program.query-options'
import { useIsFetchingTrainingPrograms } from '../hooks/use-is-fetching-training-programs'
import {
  createTrainingProgramDtoSchema,
  type CreateTrainingProgramDto,
} from '../model/create-training-program.dto'
import { trainingProgramService } from '../services/training-program.service'

export const CreateTrainingProgramSheet = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <PlusIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
        <SheetHeader className="border-b">
          <SheetTitle>Новая программа</SheetTitle>
        </SheetHeader>

        <CreateTrainingProgramForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  )
}

const CreateTrainingProgramForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const queryClient = useQueryClient()
  const formId = useId()
  const form = useForm<CreateTrainingProgramDto>({
    resolver: zodResolver(createTrainingProgramDtoSchema),
    defaultValues: {
      name: '',
      exerciseIds: [],
    },
  })

  const isFetchingTrainingPrograms = useIsFetchingTrainingPrograms()
  const createTrainingProgramMutation = useMutation({
    mutationFn: trainingProgramService.create,
  })
  const exercisesQuery = useQuery(exercisesQueryOptions.getAll())
  const exercises = exercisesQuery.data ?? []

  const onSubmit: SubmitHandler<CreateTrainingProgramDto> = async data => {
    const { toast } = await import('sonner')

    const { error, response } = await tryCatch(createTrainingProgramMutation.mutateAsync(data))

    if (error) {
      toast.error(error.message)
      return
    }

    await queryClient.invalidateQueries(trainingProgramQueryOptions.getAll())

    toast.success(`Программа «${response.data.name}» создана`)

    setOpen(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          id={formId}
          className="px-4 flex-1 min-h-0 flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name="name"
            label="Название программы"
            inputProps={{ placeholder: 'Например: День ног' }}
          />

          <FormField
            control={form.control}
            name="exerciseIds"
            render={({ field }) => (
              <FormItem className="flex-1 min-h-0 flex! flex-col">
                <div className="flex items-center justify-between">
                  <FormLabel>Выберите упражнения</FormLabel>
                  <Badge variant="secondary">{field.value.length} выбрано</Badge>
                </div>

                <FormExercisesList
                  isFetching={exercisesQuery.isFetching}
                  exercises={exercises}
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <SheetFooter className="border-t">
        <Button
          className="w-full"
          type="submit"
          form={formId}
          loading={createTrainingProgramMutation.isPending || isFetchingTrainingPrograms}
        >
          Создать программу
        </Button>
      </SheetFooter>
    </>
  )
}

// Можно вынести в отдельный компонент, если будет использоваться где-то ещё
const FormExercisesList = ({
  isFetching,
  exercises,
  value,
  onChange,
}: {
  isFetching: boolean
  exercises: ExerciseModel[]
  value: string[]
  onChange: (value: string[]) => void
}) => {
  if (isFetching) {
    return (
      <ScrollArea className="h-full flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-[66px] w-full rounded-lg" />
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <FormControl>
      {exercises.length ? (
        <ScrollArea className="h-full flex-1 min-h-0">
          <div className="flex flex-col gap-2">
            {exercises.map(exercise => (
              <SelectableExerciseCard
                key={exercise.id}
                exercise={exercise}
                checked={value.includes(exercise.id)}
                onCheckedChange={(checked: boolean) => {
                  const newValue = checked
                    ? [...value, exercise.id]
                    : value.filter(x => x !== exercise.id)

                  onChange(newValue)
                }}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-8 border rounded-lg border-dashed">
          <p className="text-sm text-muted-foreground">Сначала создайте упражнения</p>
        </div>
      )}
    </FormControl>
  )
}
