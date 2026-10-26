// @vitest-environment jsdom

import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDelayedFlag } from './useDelayedFlag'

describe('useDelayedFlag', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('сразу после включения флага возвращает false', () => {
    const { result } = renderHook(() => useDelayedFlag(true, 250))

    expect(result.current).toBe(false)
  })

  it('после истечения задержки возвращает true', () => {
    const { result } = renderHook(() => useDelayedFlag(true, 250))

    act(() => {
      vi.advanceTimersByTime(249)
    })

    expect(result.current).toBe(false)

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(result.current).toBe(true)
  })

  it('если флаг выключился до окончания задержки, возвращает false', () => {
    const { result, rerender } = renderHook(
      ({ flag, delay }) => useDelayedFlag(flag, delay),
      { initialProps: { flag: true, delay: 250 } }
    )

    act(() => {
      vi.advanceTimersByTime(100)
    })

    rerender({ flag: false, delay: 250 })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe(false)
  })

  it('после завершения загрузки сбрасывает true обратно в false', () => {
    const { result, rerender } = renderHook(
      ({ flag, delay }) => useDelayedFlag(flag, delay),
      { initialProps: { flag: true, delay: 250 } }
    )

    act(() => {
      vi.advanceTimersByTime(250)
    })

    expect(result.current).toBe(true)

    rerender({ flag: false, delay: 250 })

    expect(result.current).toBe(false)
  })
})
