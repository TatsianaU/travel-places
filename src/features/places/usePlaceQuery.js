import { useQuery } from '@tanstack/react-query'

import { fetchPlace } from '../../api/places'
import { placesKeys } from './queryKeys'

export function usePlaceQuery(id) {
  return useQuery({
    // queryKey включает все параметры, которые влияют на запрос
    queryKey: placesKeys.detail(id ?? ''),

    // queryFn - функция, которая возвращает Promise с данными
    // Функция выполняется только при enabled = true
    queryFn: () => {
      // Проверяем, что id есть, иначе выкидываем ошибку
      if (!id) {
        throw new Error('Параметр id является обязательным')
      }
      return fetchPlace(id)
    },

    // Отключаем запрос, если у нас не передан id
    enabled: Boolean(id),
  })
}
