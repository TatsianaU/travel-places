import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const COMPARE_PLACES_STORAGE_KEY = 'compare-places-store'
const MAX_COMPARE = 3

export const useComparePlacesStore = create(
  persist(
    (set, get) => ({
      compareIds: [],

      addToCompare: (id) => {
        const { compareIds } = get()

        if (compareIds.includes(id)) {
          return
        }

        if (compareIds.length >= MAX_COMPARE) {
          return
        }

        set({ compareIds: [...compareIds, id] })
      },

      removeFromCompare: (id) => {
        const { compareIds } = get()

        if (!compareIds.includes(id)) {
          return
        }

        set({ compareIds: compareIds.filter((item) => item !== id) })
      },

      toggleCompare: (id) => {
        const { compareIds, addToCompare, removeFromCompare } = get()

        if (compareIds.includes(id)) {
          removeFromCompare(id)
          return
        }

        addToCompare(id)
      },

      clearCompare: () => {
        if (get().compareIds.length === 0) {
          return
        }

        set({ compareIds: [] })
      },
    }),
    {
      name: COMPARE_PLACES_STORAGE_KEY,
      partialize: (state) => ({ compareIds: state.compareIds }),
    }
  )
)
