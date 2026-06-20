export const placesKeys = {
  // Все запросы про места
  all: ['places'],

  // Все возможные списки без конкретных параметров
  lists: () => [...placesKeys.all, 'list'],

  // Один конкретный список под заданные фильтры или страницу
  list: (params) => [...placesKeys.lists(), params],

  // Все запросы по деталям (без id)
  details: () => [...placesKeys.all, 'detail'],

  // Одно конкретное место по id
  detail: (id) => [...placesKeys.details(), id],
}
