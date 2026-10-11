import { describe, expect, it } from 'vitest'

import { toastReducer } from './toastReducer'

describe('toastReducer', () => {
  it('Добавляет уведомление в конец списка', () => {
    const state = [{ id: '1', message: 'Первое' }]
    const action = { type: 'added', toast: { id: '2', message: 'Второе' } }

    const next = toastReducer(state, action)

    expect(next).toEqual([
      { id: '1', message: 'Первое' },
      { id: '2', message: 'Второе' },
    ])
  })

  it('Не мутирует исходный массив при добавлении', () => {
    const state = [{ id: '1', message: 'Первое' }]
    const action = { type: 'added', toast: { id: '2', message: 'Второе' } }

    const next = toastReducer(state, action)

    expect(state).toEqual([{ id: '1', message: 'Первое' }])
    expect(next).not.toBe(state)
  })

  it('Удаляет только уведомление с указанным id', () => {
    const state = [
      { id: '1', message: 'Первое' },
      { id: '2', message: 'Второе' },
      { id: '3', message: 'Третье' },
    ]
    const action = { type: 'removed', id: '2' }

    const next = toastReducer(state, action)

    expect(next).toEqual([
      { id: '1', message: 'Первое' },
      { id: '3', message: 'Третье' },
    ])
  })

  it('Не мутирует исходный массив при удалении', () => {
    const state = [
      { id: '1', message: 'Первое' },
      { id: '2', message: 'Второе' },
      { id: '3', message: 'Третье' },
    ]
    const action = { type: 'removed', id: '2' }

    const next = toastReducer(state, action)

    expect(state).toEqual([
      { id: '1', message: 'Первое' },
      { id: '2', message: 'Второе' },
      { id: '3', message: 'Третье' },
    ])
    expect(next).not.toBe(state)
  })

  it('При несуществующем id возвращает тот же state по ссылке', () => {
    const state = [
      { id: '1', message: 'Первое' },
      { id: '2', message: 'Второе' },
    ]
    const action = { type: 'removed', id: '999' }

    const next = toastReducer(state, action)

    expect(next).toBe(state)
    expect(next).toEqual([
      { id: '1', message: 'Первое' },
      { id: '2', message: 'Второе' },
    ])
  })

  it('При неизвестном действии выбрасывает ошибку с понятным сообщением', () => {
    const state = [{ id: '1', message: 'Первое' }]
    const action = { type: 'unknown' }

    expect(() => toastReducer(state, action)).toThrow('Неизвестное действие: unknown')
  })
})
