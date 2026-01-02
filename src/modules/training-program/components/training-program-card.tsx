import { EditIcon, EllipsisVerticalIcon, TrashIcon } from 'lucide-react'
import { useState, type ComponentProps } from 'react'

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@common/components/ui'

import { DeleteTrainingProgramAlertDialog } from './delete-training-program-alert-dialog'
import { UpdateTrainingProgramSheet } from './update-training-program-sheet'
import type { TrainingProgramModel } from '../model/training-program.model'

interface TrainingProgramCardProps extends ComponentProps<typeof Card> {
  trainingProgram: TrainingProgramModel
}

export const TrainingProgramCard = ({ trainingProgram, ...props }: TrainingProgramCardProps) => {
  const [isShowAllExercises, setIsShowAllExercises] = useState(false)

  const exercises = isShowAllExercises
    ? trainingProgram.exercises
    : trainingProgram.exercises.slice(0, 3)

  const buttonText = isShowAllExercises ? 'Скрыть' : ` +${trainingProgram.exercises.length - 3}`

  const toggleShowAllExercises = () => {
    setIsShowAllExercises(prev => !prev)
  }

  return (
    <Card key={trainingProgram.id} {...props}>
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">{trainingProgram.name}</CardTitle>
          <CardDescription>{trainingProgram.exercises.length} упражнений</CardDescription>
        </div>

        <TrainingProgramCardActions trainingProgram={trainingProgram} />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5 mt-2">
          {exercises.map(exercise => {
            return (
              <Badge key={exercise.id} variant="outline" className="text-[10px]">
                {exercise?.name || 'Удалено'}
              </Badge>
            )
          })}

          {trainingProgram.exercises.length > 3 && (
            <Badge variant="outline" className="text-[10px]" onClick={toggleShowAllExercises}>
              {buttonText}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const TrainingProgramCardActions = ({
  trainingProgram,
}: {
  trainingProgram: TrainingProgramModel
}) => {
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

      <UpdateTrainingProgramSheet
        trainingProgram={trainingProgram}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <DeleteTrainingProgramAlertDialog
        trainingProgram={trainingProgram}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  )
}
