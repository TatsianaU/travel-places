import { useContext } from 'react'

import { ToastContext } from './ToastContext'

export function useToasts() {
  const context = useContext(ToastContext)

  if (context === null) {
    throw new Error('useToasts можно вызывать только внутри <ToastProvider>')
  }

  return context
}
