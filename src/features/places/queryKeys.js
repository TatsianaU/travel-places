export const placesKeys = {
  all: ['places'],
  lists: () => [...placesKeys.all, 'list'],
  list: (params) => [...placesKeys.lists(), params],
  details: () => [...placesKeys.all, 'detail'],
  detail: (id) => [...placesKeys.details(), id],
}
