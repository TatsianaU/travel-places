import { useQuery } from '@tanstack/react-query'

import { fetchPlacesPage } from '../../api/places'
import { placesKeys } from './queryKeys'

export function usePlacesQuery(params) {
  return useQuery({
  
    queryKey: placesKeys.list(params),


    queryFn: () => fetchPlacesPage(params),

   
    placeholderData: (previousData) => previousData,
  })
}
