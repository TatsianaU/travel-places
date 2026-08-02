import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const FAVORITES_STORE_STORAGE_KEY = 'favorites-store'

export const useFavoritesStore = create(
  devtools(
    persist(
      (set, get) => ({
        favoriteIds: [],

        addFavorite: (id) => {
          if (get().favoriteIds.includes(id)) {
            return
          }

          set({ favoriteIds: [...get().favoriteIds, id] }, false, 'favorites/addFavorite')
        },

        removeFavorite: (id) => {
          if (!get().favoriteIds.includes(id)) {
            return
          }

          set(
            { favoriteIds: get().favoriteIds.filter((item) => item !== id) },
            false,
            'favorites/removeFavorite'
          )
        },

        toggleFavorite: (id) => {
          const { favoriteIds } = get()

          if (favoriteIds.includes(id)) {
            set(
              { favoriteIds: favoriteIds.filter((item) => item !== id) },
              false,
              'favorites/toggleFavorite'
            )
            return
          }

          set({ favoriteIds: [...favoriteIds, id] }, false, 'favorites/toggleFavorite')
        },

        clearFavorites: () => {
          if (get().favoriteIds.length === 0) {
            return
          }

          set({ favoriteIds: [] }, false, 'favorites/clearFavorites')
        },
      }),
      {
        name: FAVORITES_STORE_STORAGE_KEY,
        partialize: (state) => ({ favoriteIds: state.favoriteIds }),
      }
    ),
    { name: 'FavoritesStore' }
  )
)
