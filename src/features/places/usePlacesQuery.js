import { useQuery } from '@tanstack/react-query'

import { fetchPlacesPage } from '../../api/places'
import { placesKeys } from './queryKeys'

export function usePlacesQuery(params) {
  return useQuery({
    // queryKey включает все параметры, которые влияют на запрос
    queryKey: placesKeys.list(params),

    // queryFn - функция, которая возвращает Promise с данными
    queryFn: () => fetchPlacesPage(params),

    // Пока идет запрос за новой страницей, показываем предыдущие данные
    placeholderData: (previousData) => previousData,
  })
}
