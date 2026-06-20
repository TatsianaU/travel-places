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

    // Детали места меняются реже списка, поэтому держим их "свежими" дольше -
    // 5 минут вместо общих 30 секунд из main.jsx. Локальная опция перекрывает defaultOptions.
    staleTime: 5 * 60_000,

    // Вопрос ДЗ: "Если другой пользователь поменяет это место за эти 5 минут - увидим ли мы изменения сразу?"
    // Нет, не сразу. Пока данные считаются "fresh" (в течение staleTime), TanStack Query не делает
    // повторный запрос и отдаёт значение из кеша - чужие правки мы не увидим. Изменения подтянутся, когда:
    //   - истечёт staleTime и сработает триггер refetch (новый mount, возврат на вкладку и т.п.), либо
    //   - кеш будет инвалидирован мутацией (invalidateQueries в usePlaceMutation), либо
    //   - вызовем refetch() вручную (кнопка "Обновить" на странице деталей).
  })
}
