import './TravelFeed.css'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

import { useManyTravelPostsQuery } from '../../features/travelPosts/useManyTravelPostsQuery'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import TravelPostCard from '../TravelPostCard/TravelPostCard'
import TravelFeedSkeletonRow from './TravelFeedSkeletonRow'

const ROW_HEIGHT = 172

const SKELETON_ROWS_COUNT = 5

export default function VirtualizedTravelPosts({ category = '' }) {
  const { data: posts, isPending, isError, error, refetch } = useManyTravelPostsQuery({ category })
  const scrollRef = useRef(null)

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: posts?.length ?? 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6,
  })

  if (isError) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : 'Не удалось загрузить ленту'}
        onRetry={refetch}
      />
    )
  }

  if (!isPending && (!posts || posts.length === 0)) {
    return <p className="travel-feed-status">Лента пуста</p>
  }

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div className="travel-feed">
      {!isPending && (
        <div className="travel-feed-stats">
          <span className="travel-feed-stat">
            Всего записей в памяти: <strong>{posts.length}</strong>
          </span>
          <span className="travel-feed-stat">
            Карточек сейчас в DOM: <strong>{virtualItems.length}</strong>
          </span>
          <span className="travel-feed-stat travel-feed-stat--hint">Скрольте список - в DOM остается лишь видимая часть + overscan (6)</span>
        </div>
      )}

      <div
        ref={scrollRef}
        className="travel-feed-scroll"
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            {/* 5 заглушек — это примерно один экран при высоте контейнера 70vh;
                заглушки для всех постов не создаём. */}
            {Array.from({ length: SKELETON_ROWS_COUNT }, (_, index) => (
              <TravelFeedSkeletonRow
                key={index}
                rowHeight={ROW_HEIGHT}
              />
            ))}
          </>
        ) : (
          <div
            className="travel-feed-virtual-inner"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {virtualItems.map((virtualItem) => {
              const post = posts[virtualItem.index]

              return (
                <div
                  key={virtualItem.key}
                  className="travel-feed-virtual-row"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <TravelPostCard post={post} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
