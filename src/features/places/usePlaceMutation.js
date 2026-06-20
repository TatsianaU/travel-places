import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createPlace, deletePlace, updatePlace } from '../../api/places'
import { placesKeys } from './queryKeys'

export function useCreatePlace() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (placeData) => createPlace(placeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKeys.lists() })
    },
  })
}

export function useUpdatePlace() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updatePlace(id, data),
    onSuccess: (_updatedPlace, variables) => {
      queryClient.invalidateQueries({ queryKey: placesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: placesKeys.detail(variables.id) })
    },
  })
}

export function useDeletePlace() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deletePlace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKeys.all })
    },
  })
}
