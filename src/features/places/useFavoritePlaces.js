import { useQueryClient } from '@tanstack/react-query'

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { placesKeys } from './queryKeys'

export function useFavoritePlaces() {
  const queryClient = useQueryClient()
  const [favoriteIds, setFavoriteIds] = useLocalStorage('wishlistIds', [])

  const favorites = favoriteIds
    .map((id) => queryClient.getQueryData(placesKeys.detail(id)))
    .filter((place) => place != null)

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]))
  }

  return { favorites, favoriteIds, toggleFavorite }
}
