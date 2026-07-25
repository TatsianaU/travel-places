export const placesKeys = {
  all: ['places'],
  lists: () => [...placesKeys.all, 'list'],
  fullList: () => [...placesKeys.lists(), 'full'],
  list: (params) => [...placesKeys.lists(), params],
  details: () => [...placesKeys.all, 'detail'],
  detail: (id) => [...placesKeys.details(), id],
}
