import { useQuery } from '@tanstack/react-query'

import { getManyTravelPosts } from '../../api/travelPosts'
import { travelPostsKeys } from './queryKeys'

const DEFAULT_LIMIT = 1000

export function useManyTravelPostsQuery({ limit = DEFAULT_LIMIT, category = '' } = {}) {
  return useQuery({
    queryKey: travelPostsKeys.many(limit, category),
    queryFn: () => getManyTravelPosts({ limit, category }),
  })
}
