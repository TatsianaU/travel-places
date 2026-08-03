import { USE_FAVORITES_STORE } from './favoritesMode'
import { useFavoritesFromContext } from './useFavoritesFromContext'
import { useFavoritesFromStore } from './useFavoritesFromStore'

export function useFavorites() {
  if (USE_FAVORITES_STORE) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFavoritesFromStore()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useFavoritesFromContext()
}
