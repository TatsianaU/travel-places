import { useContext } from 'react'

import { RecentPlacesContext } from './RecentPlacesContext'

export function useRecentPlaces() {
  const context = useContext(RecentPlacesContext)

  if (context === null) {
    throw new Error('useRecentPlaces можно вызывать только внутри <RecentPlacesProvider>')
  }

  return context
}
