import { EditIcon, EllipsisVerticalIcon, TrashIcon, UserIcon, WeightIcon } from 'lucide-react'
import { useState, type ComponentProps } from 'react'

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@common/components/ui'
import { cn } from '@common/lib'

import { DeleteExerciseAlertDialog } from './delete-exercise-alert-dialog'
import { UpdateExerciseSheet } from './update-exercise-sheet'
import type { ExerciseModel } from '../model/exercise.model'

interface ExerciseCardProps extends ComponentProps<'div'> {
  exercise: ExerciseModel
}

export const ExerciseCard = ({ exercise, className, ...props }: ExerciseCardProps) => {
  return (
    <div
      key={exercise.id}
      className={cn(
        'flex items-center justify-between gap-2 p-3 rounded-md bg-secondary/50 border border-border/50',
        className
      )}
      {...props}
    >
      <span className="font-medium">{exercise.name}</span>
      <div className="flex gap-2 items-center">
        {exercise.doubleWeight && (
          <Badge variant="default">
            <WeightIcon className="size-3" />
            <span>x2</span>
          </Badge>
        )}
        {exercise.bodyWeight && (
          <Badge variant="default">
            <UserIcon className="size-3" />
            <span>Свой</span>
          </Badge>
        )}

        <ExerciseCardActions exercise={exercise} />
      </div>
    </div>
  )
  return <div>ExerciseCard</div>
}

const ExerciseCardActions = ({ exercise }: { exercise: ExerciseModel }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEditExercise = () => {
    setIsEditDialogOpen(true)
  }

  const handleDeleteExercise = () => {
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={handleEditExercise}>
            <EditIcon className="size-4" />
            Изменить
          </DropdownMenuItem>

          <DropdownMenuItem variant="destructive" onClick={handleDeleteExercise}>
            <TrashIcon className="size-4" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateExerciseSheet
        exercise={exercise}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <DeleteExerciseAlertDialog
        exercise={exercise}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  )
}
