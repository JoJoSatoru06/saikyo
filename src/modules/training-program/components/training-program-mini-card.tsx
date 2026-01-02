import type { ComponentProps } from 'react'

import { Card, CardContent } from '@common/components/ui'
import { cn } from '@common/lib/cn'

import type { TrainingProgramModel } from '../model/training-program.model'

interface TrainingProgramMiniCardProps extends ComponentProps<typeof Card> {
  trainingProgram: TrainingProgramModel
}

export const TrainingProgramMiniCard = ({
  trainingProgram,
  className,
  ...props
}: TrainingProgramMiniCardProps) => {
  return (
    <Card
      key={trainingProgram.id}
      className={cn('justify-start text-left gap-2 py-2', className)}
      {...props}
    >
      <CardContent className="flex flex-col px-4">
        <span className="font-semibold">{trainingProgram.name}</span>
        <span className="text-xs text-muted-foreground">
          {trainingProgram.exercises.length} упражнений
        </span>
      </CardContent>
    </Card>
  )
}
