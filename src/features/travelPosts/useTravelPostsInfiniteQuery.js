import { useInfiniteQuery } from '@tanstack/react-query'

import { getTravelPostsPage } from '../../api/travelPosts'
import { travelPostsKeys } from './queryKeys'

const PER_PAGE = 20

export function useTravelPostsInfiniteQuery() {
  const query = useInfiniteQuery({
    queryKey: travelPostsKeys.infinite(),
    queryFn: ({ pageParam }) => getTravelPostsPage({ page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })

  const posts = query.data?.pages.flatMap((page) => page.data) ?? []
  const totalItems = query.data?.pages[0]?.items ?? 0
  const loadedPages = query.data?.pages.length ?? 0

  return {
    posts,
    totalItems,
    loadedPages,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  }
}
