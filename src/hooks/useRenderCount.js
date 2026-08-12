import { useEffect, useRef } from 'react'

export function useRenderCount() {
  const renderCount = useRef(0)

  // eslint-disable-next-line react-hooks/refs
  const currentRenderCount = (renderCount.current += 1)
  return currentRenderCount
}

export function useRenderCountSafe() {
  const renderCountRef = useRef(0)

  useEffect(() => {
    renderCountRef.current += 1
  })

  return renderCountRef.current
}
