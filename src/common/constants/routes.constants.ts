import type { FileRouteTypes } from '@app/routeTree.gen'

export const ROUTES = {
  HOME: '/',
  EXERCISES: '/exercises',
  PROGRAMS: '/programs',
} satisfies Record<string, FileRouteTypes['to']>
