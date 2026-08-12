import { useRef } from 'react'

export function useRenderCount() {
  const renderCount = useRef(0)

  // eslint-disable-next-line react-hooks/refs
  const currentRenderCount = (renderCount.current += 1)
  return currentRenderCount
}
