import { useQuery } from '@tanstack/react-query'

import { getManyTravelPosts } from '../../api/travelPosts'
import { travelPostsKeys } from './queryKeys'

const DEFAULT_LIMIT = 1000

export function useManyTravelPostsQuery(limit = DEFAULT_LIMIT) {
  return useQuery({
    queryKey: travelPostsKeys.many(limit),
    queryFn: () => getManyTravelPosts({ limit }),
  })
}
