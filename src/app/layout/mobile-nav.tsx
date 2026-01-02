import { Link } from '@tanstack/react-router'
import { CalendarIcon, ClipboardListIcon, DumbbellIcon } from 'lucide-react'

import { ROUTES } from '@common/constants'

const LINKS = [
  {
    label: 'Расписание',
    to: ROUTES.HOME,
    Icon: CalendarIcon,
  },
  {
    label: 'Упражнения',
    to: ROUTES.EXERCISES,
    Icon: DumbbellIcon,
  },
  {
    label: 'Программы',
    to: ROUTES.PROGRAMS,
    Icon: ClipboardListIcon,
  },
]

export const MobileNav = () => {
  return (
    <nav className="flex h-16 items-center justify-around border-t bg-background fixed bottom-0 left-0 right-0 max-w-xl mx-auto">
      {LINKS.map(({ label, to, Icon }) => (
        <Link
          key={to}
          to={to}
          className="flex flex-col items-center justify-center gap-1 transition-colors text-muted-foreground"
          activeProps={{
            className: 'text-primary',
          }}
        >
          <Icon className="size-6" />

          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </nav>
  )
}
