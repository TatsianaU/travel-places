import { useQuery } from '@tanstack/react-query'

import { fetchPlaces } from '../../api/places'
import { placesKeys } from './queryKeys'

export function useAllPlacesQuery() {
  return useQuery({
    queryKey: placesKeys.fullList(),
    queryFn: () => fetchPlaces(),
  })
}
