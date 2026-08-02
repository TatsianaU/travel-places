import { useFavoritesStore } from './favoritesStore'

export function useFavoritesFromStore() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds)
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)

  function isFavorite(id) {
    return favoriteIds.includes(id)
  }

  return {
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  }
}
