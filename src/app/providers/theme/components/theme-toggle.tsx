import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '@common/components/ui'

import { useThemeStore } from '../model/theme.store'

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore()

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={handleThemeChange}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Переключить тему</span>
      </Button>
    </>
  )
}
