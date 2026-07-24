import './ThemeToggle.css'

import { Moon, Sun } from 'lucide-react'

import { THEME_LABEL } from '../../features/theme/ThemeContext'
import { useTheme } from '../../features/theme/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'
  const label = isDark ? 'Включить светлую тему' : 'Включить темную тему'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={`${label} (сейчас ${THEME_LABEL[theme]})`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
