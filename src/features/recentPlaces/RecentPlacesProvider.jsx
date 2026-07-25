import { useEffect, useReducer } from 'react'

import { RecentPlacesContext } from './RecentPlacesContext'
import { recentPlacesReducer } from './recentPlacesReducer'

const RECENT_PLACES_STORAGE_KEY = 'recentPlaceIds'

function loadInitialRecentPlaces() {
  try {
    const stored = window.localStorage.getItem(RECENT_PLACES_STORAGE_KEY)
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

export function RecentPlacesProvider({ children }) {
  const [recentIds, dispatch] = useReducer(recentPlacesReducer, undefined, loadInitialRecentPlaces)

  useEffect(() => {
    window.localStorage.setItem(RECENT_PLACES_STORAGE_KEY, JSON.stringify(recentIds))
  }, [recentIds])

  function markViewed(id) {
    dispatch({ type: 'viewed', id })
  }

  function clearRecent() {
    dispatch({ type: 'cleared' })
  }

  const value = {
    recentIds,
    markViewed,
    clearRecent,
  }

  return <RecentPlacesContext value={value}>{children}</RecentPlacesContext>
}
