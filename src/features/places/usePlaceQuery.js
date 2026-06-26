import { useQuery } from '@tanstack/react-query'

import { fetchPlace } from '../../api/places'
import { placesKeys } from './queryKeys'

export function usePlaceQuery(id) {
  return useQuery({
    queryKey: placesKeys.detail(id ?? ''),

    queryFn: () => {
      if (!id) {
        throw new Error('Параметр id является обязательным')
      }
      return fetchPlace(id)
    },

    enabled: Boolean(id),

    staleTime: 5 * 60_000,

    // Вопрос ДЗ: "Если другой пользователь поменяет это место за эти 5 минут - увидим ли мы изменения сразу?"
    // Нет, не сразу. Пока данные считаются "fresh" (в течение staleTime), TanStack Query не делает
    // повторный запрос и отдаёт значение из кеша - чужие правки мы не увидим.
  })
}
