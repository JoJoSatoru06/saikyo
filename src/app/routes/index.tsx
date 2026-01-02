import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { format, isSameDay, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useState } from 'react'

import { Calendar, PageLoader } from '@common/components/ui'
import { APP_CONSTANTS } from '@common/constants'

import { CreateWorkoutSheet, workoutQueryOptions } from '@modules/workout'

const RouteComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const workoutsQuery = useSuspenseQuery(workoutQueryOptions.getAll())
  const workouts = workoutsQuery.data?.data ?? []

  const currentWorkout = workouts.find(workout => isSameDay(workout.date, selectedDate))
  const highlightedDays = workouts.map(workout => parseISO(workout.date))

  return (
    <div className="h-[calc(100dvh-64px)] overflow-hidden flex flex-col">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        buttonVariant="outline"
        className="rounded-lg w-full max-w-md mx-auto"
        required
        modifiers={{
          workout: highlightedDays,
        }}
        modifiersClassNames={{
          workout:
            'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:size-1 after:bg-primary after:rounded-full font-bold text-primary',
        }}
      />

      <div className="p-4 space-y-4 bg-secondary rounded-t-4xl flex-1 min-h-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {format(selectedDate, 'd MMMM, EEEE', { locale: ru })}
          </h2>

          <CreateWorkoutSheet date={selectedDate} />
        </div>

        {currentWorkout?.date}
      </div>

      {/* <ScrollArea className="bg-secondary rounded-t-lg flex-1 min-h-0">
        <div className="flex-1 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {format(selectedDate, 'd MMMM, EEEE', { locale: ru })}
            </h2>
          </div>
        </div>
        <div className="px-2 space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. {index + 1}
            </p>
          ))}
        </div>
      </ScrollArea> */}
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader />,
  pendingMs: APP_CONSTANTS.PAGE_PENDING_MS,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(workoutQueryOptions.getAll())
  },
})
