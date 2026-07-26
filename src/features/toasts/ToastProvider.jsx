import { useEffect, useReducer, useRef } from 'react'

import { ToastContext } from './ToastContext'
import { toastReducer } from './toastReducer'

const TOAST_DURATION_MS = 4500

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, [])
  const timersRef = useRef(new Map())

  function dismissToast(id) {
    const timerId = timersRef.current.get(id)
    if (timerId != null) {
      window.clearTimeout(timerId)
      timersRef.current.delete(id)
    }

    dispatch({ type: 'removed', id })
  }

  function showToast(message) {
    const id = crypto.randomUUID()

    const timerId = window.setTimeout(() => {
      dismissToast(id)
    }, TOAST_DURATION_MS)

    timersRef.current.set(id, timerId)
    dispatch({ type: 'added', toast: { id, message } })
  }

  useEffect(() => {
    const timers = timersRef.current

    return () => {
      timers.forEach((timerId) => {
        window.clearTimeout(timerId)
      })
      timers.clear()
    }
  }, [])

  const value = {
    toasts,
    showToast,
    dismissToast,
  }

  return <ToastContext value={value}>{children}</ToastContext>
}
