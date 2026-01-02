import { Label } from '@radix-ui/react-label'
import type { ComponentProps } from 'react'

import { Checkbox } from '@common/components/ui'
import { cn } from '@common/lib'

import type { ExerciseModel } from '../model/exercise.model'

interface SelectableExerciseCardProps extends ComponentProps<typeof Label> {
  exercise: ExerciseModel
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange: (checked: boolean) => void
  checkboxProps?: Omit<
    ComponentProps<typeof Checkbox>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'disabled'
  >
}

export const SelectableExerciseCard = ({
  exercise,
  className,
  checkboxProps,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  ...props
}: SelectableExerciseCardProps) => {
  return (
    <Label
      data-disabled={disabled}
      data-state={checked || defaultChecked ? 'checked' : 'unchecked'}
      className={cn(
        'flex items-start gap-3 rounded-lg border p-3 bg-secondary/20 has-aria-checked:border-primary has-aria-checked:bg-primary/10 cursor-pointer data-disabled:opacity-50 data-disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      <Checkbox
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        {...checkboxProps}
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{exercise.name}</p>
        <p className="text-muted-foreground text-sm">{exercise.muscleGroup.label}</p>
      </div>
    </Label>
  )
}
