import './TravelFeed.css'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useState } from 'react'

import { useManyTravelPostsQuery } from '../../features/travelPosts/useManyTravelPostsQuery'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Skeleton from '../Skeleton/Skeleton'
import TravelPostCard from '../TravelPostCard/TravelPostCard'
import TravelFeedSkeletonRow from './TravelFeedSkeletonRow'

const ROW_HEIGHT = 172

// Держим в синхроне с .travel-feed-scroll { height: 70vh } в TravelFeed.css.
const SCROLL_HEIGHT_VH = 70

function getSkeletonRowsCount() {
  const scrollHeight = (window.innerHeight * SCROLL_HEIGHT_VH) / 100
  return Math.max(1, Math.ceil(scrollHeight / ROW_HEIGHT))
}

export default function VirtualizedTravelPosts({ category = '' }) {
  const { data: posts, isPending, isError, error, refetch } = useManyTravelPostsQuery({ category })
  const scrollRef = useRef(null)

  // Считаем один раз при монтировании: заглушки живут только во время загрузки,
  // пересчитывать их на resize смысла нет
  const [skeletonRowsCount] = useState(getSkeletonRowsCount)

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
      <div className="travel-feed-stats">
        <span className="travel-feed-stat">
          Всего записей в памяти:{' '}
          {isPending ? (
            <Skeleton
              width="42px"
              height="14px"
            />
          ) : (
            <strong>{posts.length}</strong>
          )}
        </span>
        <span className="travel-feed-stat">
          Карточек сейчас в DOM:{' '}
          {isPending ? (
            <Skeleton
              width="28px"
              height="14px"
            />
          ) : (
            <strong>{virtualItems.length}</strong>
          )}
        </span>
        <span className="travel-feed-stat travel-feed-stat--hint">Скрольте список - в DOM остается лишь видимая часть + overscan (6)</span>
      </div>

      <div
        ref={scrollRef}
        className="travel-feed-scroll"
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            {/* Количество заглушек считаем от 70vh и ROW_HEIGHT — примерно один экран,
                заглушки для всех постов не создаём. */}
            {Array.from({ length: skeletonRowsCount }, (_, index) => (
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
