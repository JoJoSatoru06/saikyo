import type { QueryClient } from '@tanstack/react-query'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import { AppLayout } from '@app/layout/app-layout'
import { ThemeProvider } from '@app/providers/theme'

const RootComponent = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <Outlet />
        <Toaster />
      </AppLayout>
    </ThemeProvider>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})
