import { useMemo } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'

export const STORAGE_KEY = 'placesTableColumnVisibility'

export const DEFAULT_COLUMN_VISIBILITY = {
  description: false,
}

export const ALWAYS_VISIBLE_COLUMN_IDS = ['title']

export function useColumnVisibilityStorage() {
  const [visibility, setVisibility] = useLocalStorage(STORAGE_KEY, DEFAULT_COLUMN_VISIBILITY)

  const safeVisibility = useMemo(() => {
    const next = { ...visibility }

    ALWAYS_VISIBLE_COLUMN_IDS.forEach((columnId) => {
      delete next[columnId]
    })

    return next
  }, [visibility])

  return [safeVisibility, setVisibility]
}
