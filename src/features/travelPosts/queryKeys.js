export const travelPostsKeys = {
  all: ['travelPosts'],
  infinite: () => [...travelPostsKeys.all, 'infinite'],
  many: (limit) => [...travelPostsKeys.all, 'many', limit],
}
