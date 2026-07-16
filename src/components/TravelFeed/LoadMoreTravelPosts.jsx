import './TravelFeed.css'

import { useTravelPostsInfiniteQuery } from '../../features/travelPosts/useTravelPostsInfiniteQuery'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import TravelPostCard from '../TravelPostCard/TravelPostCard'

export default function LoadMoreTravelPosts() {
  const { posts, totalItems, loadedPages, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, error, refetch } =
    useTravelPostsInfiniteQuery()

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Не удалось загрузить ленту'}
        onRetry={refetch}
      />
    )
  }

  if (posts.length === 0) {
    return <p className="travel-feed-status">Лента пуста</p>
  }

  return (
    <div className="travel-feed">
      <div className="travel-feed-stats">
        <span className="travel-feed-stat">
          Загружено карточек: <strong>{posts.length}</strong> из {totalItems}
        </span>
        <span className="travel-feed-stat">
          Страниц загружено: <strong>{loadedPages}</strong>
        </span>
      </div>

      <div className="travel-feed-list">
        {posts.map((post) => (
          <TravelPostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      {isFetchingNextPage && <p className="travel-feed-status">Загружаем еще...</p>}

      {hasNextPage ? (
        <button
          type="button"
          className="travel-feed-load-more"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Загрузка...' : 'Загрузить ещё'}
        </button>
      ) : (
        <p className="travel-feed-end">Вы долистали до конца ленты</p>
      )}
    </div>
  )
}
