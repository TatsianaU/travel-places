import { useContext } from 'react'

import { ThemeContext } from './ThemeContext'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme можно вызывать только внутри <ThemeProvider>')
  }

  return context
}
