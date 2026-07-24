export const travelPostsKeys = {
  all: ['travelPosts'],
  infinite: (category = '') => [...travelPostsKeys.all, 'infinite', category],
  many: (limit, category = '') => [...travelPostsKeys.all, 'many', limit, category],
}
