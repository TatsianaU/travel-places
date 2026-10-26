import { useEffect, useState } from 'react'

export function useDelayedFlag(flag, delay = 250) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!flag) {
      setReady(false)
      return
    }

    const timerId = setTimeout(() => {
      setReady(true)
    }, delay)

    return () => {
      clearTimeout(timerId)
    }
  }, [flag, delay])

  return ready
}
