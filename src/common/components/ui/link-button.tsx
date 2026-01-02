import { Link } from '@tanstack/react-router'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@common/lib/cn'

import { buttonVariants } from './button'

const LinkButton = ({
  variant = 'default',
  size = 'default',
  className,
  ...props
}: VariantProps<typeof buttonVariants> & ComponentProps<typeof Link>) => {
  return <Link {...props} className={cn(buttonVariants({ variant, size }), className)} />
}

export { LinkButton }
