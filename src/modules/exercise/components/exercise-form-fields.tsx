import type { UseFormReturn } from 'react-hook-form'

import { FormInput, FormSelect, FormSwitch } from '@common/components/ui'

import { MUSCLE_GROUPS_OPTIONS } from '@modules/muscle-group'

import type { CreateExerciseDto } from '../model/create-exercise.dto'
import type { UpdateExerciseDto } from '../model/update-exercise.dto'

export const ExerciseFormFields = ({
  form,
}: {
  form: UseFormReturn<CreateExerciseDto | UpdateExerciseDto>
}) => {
  return (
    <>
      <FormInput
        control={form.control}
        name="name"
        label="Название"
        description="Например: Жим лежа"
        inputProps={{ placeholder: 'Например: Жим лежа' }}
      />
      <FormSelect
        control={form.control}
        name="muscleGroup"
        label="Группа мышц"
        options={MUSCLE_GROUPS_OPTIONS}
      />
      <FormSwitch
        control={form.control}
        name="doubleWeight"
        label="Удвоить вес"
        description="Например: для гантелей"
        switchProps={{
          onCheckedChange: () => {
            form.setValue('bodyWeight', false, { shouldDirty: true })
          },
        }}
      />
      <FormSwitch
        control={form.control}
        name="bodyWeight"
        label="Собственный вес"
        description="Например: для подтягиваний, отжиманий с собственным весом"
        switchProps={{
          onCheckedChange: () => {
            form.setValue('doubleWeight', false, { shouldDirty: true })
          },
        }}
      />
    </>
  )
}
