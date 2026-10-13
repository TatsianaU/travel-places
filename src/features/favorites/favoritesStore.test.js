import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useFavoritesStore } from './favoritesStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] })
  })

  it('При добавлении нового места в избранное подписчик вызывается один раз', () => {
    const listener = vi.fn()
    const unsubscribe = useFavoritesStore.subscribe(listener)

    useFavoritesStore.getState().addFavorite('place-1')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(useFavoritesStore.getState().favoriteIds).toEqual(['place-1'])

    unsubscribe()
  })

  it('При повторном добавлении того же id подписчик не вызывается снова', () => {
    const listener = vi.fn()
    const unsubscribe = useFavoritesStore.subscribe(listener)

    useFavoritesStore.getState().addFavorite('place-1')
    useFavoritesStore.getState().addFavorite('place-1')

    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
  })

  it('При удалении несуществующего id из пустого избранного подписчик не вызывается', () => {
    const listener = vi.fn()
    const unsubscribe = useFavoritesStore.subscribe(listener)

    useFavoritesStore.getState().removeFavorite('place-999')

    expect(listener).not.toHaveBeenCalled()

    unsubscribe()
  })

  it('При очистке уже пустого избранного подписчик не вызывается', () => {
    const listener = vi.fn()
    const unsubscribe = useFavoritesStore.subscribe(listener)

    useFavoritesStore.getState().clearFavorites()

    expect(listener).not.toHaveBeenCalled()

    unsubscribe()
  })

  it('При удалении существующего места из избранного подписчик вызывается один раз', () => {
    useFavoritesStore.getState().addFavorite('place-1')

    const listener = vi.fn()
    const unsubscribe = useFavoritesStore.subscribe(listener)

    useFavoritesStore.getState().removeFavorite('place-1')

    expect(listener).toHaveBeenCalledTimes(1)
    expect(useFavoritesStore.getState().favoriteIds).toEqual([])

    unsubscribe()
  })

  it('После unsubscribe подписчик больше не вызывается', () => {
    const listener = vi.fn()
    const unsubscribe = useFavoritesStore.subscribe(listener)

    useFavoritesStore.getState().addFavorite('place-1')
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()

    useFavoritesStore.getState().addFavorite('place-2')

    expect(useFavoritesStore.getState().favoriteIds).toEqual(['place-1', 'place-2'])
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('toggleFavorite добавляет место, которого ещё нет в избранном', () => {
    useFavoritesStore.getState().toggleFavorite('place-1')

    expect(useFavoritesStore.getState().favoriteIds).toEqual(['place-1'])
  })

  it('toggleFavorite удаляет только указанное место из избранного', () => {
    useFavoritesStore.setState({ favoriteIds: ['place-1', 'place-2'] })

    useFavoritesStore.getState().toggleFavorite('place-1')

    expect(useFavoritesStore.getState().favoriteIds).toEqual(['place-2'])
  })

  it('clearFavorites очищает непустое избранное', () => {
    useFavoritesStore.setState({ favoriteIds: ['place-1', 'place-2'] })

    useFavoritesStore.getState().clearFavorites()

    expect(useFavoritesStore.getState().favoriteIds).toEqual([])
  })
})
