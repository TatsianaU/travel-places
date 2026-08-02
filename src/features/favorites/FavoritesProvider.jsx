import { useEffect, useReducer } from 'react'

import { FavoritesContext } from './FavoritesContext'
import { favoritesReducer } from './favoritesReducer'

const FAVORITES_STORAGE_KEY = 'wishlistIds'

function loadInitialFavorites() {
  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (stored === null) {
      return []
    }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((id) => typeof id === 'string' && id !== '')
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, dispatch] = useReducer(favoritesReducer, undefined, loadInitialFavorites)

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  function isFavorite(id) {
    return favoriteIds.includes(id)
  }

  function addFavorite(id) {
    dispatch({ type: 'added', id })
  }

  function removeFavorite(id) {
    dispatch({ type: 'removed', id })
  }

  function toggleFavorite(id) {
    dispatch({ type: 'toggled', id })
  }

  function clearFavorites() {
    dispatch({ type: 'cleared' })
  }

  const value = {
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  }

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
