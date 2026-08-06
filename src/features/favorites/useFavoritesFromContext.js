import { useContext } from 'react'

import { FavoritesContext } from './FavoritesContext'

export function useFavoritesFromContext() {
  const context = useContext(FavoritesContext)

  if (context === null) {
    throw new Error('useFavoritesFromContext можно вызывать только внутри <FavoritesProvider>')
  }

  return context
}
