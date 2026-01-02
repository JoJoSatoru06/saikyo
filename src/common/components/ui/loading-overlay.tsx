import type { ComponentProps } from 'react'

import { cn } from '@common/lib'

import { Spinner } from './spinner'

export const LoadingOverlay = ({
  className,
  show,
  ...props
}: ComponentProps<'div'> & { show: boolean }) => {
  if (!show) return null

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center bg-background/80',
        className
      )}
      {...props}
    >
      <Spinner className="size-10" />
    </div>
  )
}
