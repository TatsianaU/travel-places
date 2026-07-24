import { useEffect, useState } from 'react'

import { ThemeContext } from './ThemeContext'

const THEME_STORAGE_KEY = 'theme'

function loadInitialTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadInitialTheme)

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
