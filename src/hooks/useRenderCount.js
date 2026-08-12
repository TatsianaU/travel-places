import { useEffect, useRef } from 'react'

export function useRenderCount() {
  const renderCount = useRef(0)

  // eslint-disable-next-line react-hooks/refs
  const currentRenderCount = (renderCount.current += 1)
  return currentRenderCount
}

// 1) Отстаёт: useEffect после commit, а смена ref сама по себе не вызывает render.
// 2) StrictMode в development может дополнительно вызывать render/effect.
// 3) Нечистый useRenderCount удобнее для временной диагностики прямо во время render.
// 4) Цикла нет: effect меняет ref, а не state.
export function useRenderCountSafe() {
  const renderCountRef = useRef(0)

  useEffect(() => {
    renderCountRef.current += 1
  })

  return renderCountRef.current
}
