import type { ComponentProps } from 'react'

import { cn } from '@common/lib/cn'

import { MobileNav } from './mobile-nav'

export const AppLayout = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('min-h-dvh bg-background relative max-w-xl mx-auto', className)} {...props}>
      <main className="flex-1 min-h-0 flex flex-col pb-16 w-full">{children}</main>
      <MobileNav />
    </div>
  )
}
