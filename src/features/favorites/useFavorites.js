import { USE_FAVORITES_STORE } from './favoritesMode'
import { useFavoritesFromContext } from './useFavoritesFromContext'
import { useFavoritesFromStore } from './useFavoritesFromStore'

export function useFavorites() {
  if (USE_FAVORITES_STORE) {
    return useFavoritesFromStore()
  }

  return useFavoritesFromContext()
}
