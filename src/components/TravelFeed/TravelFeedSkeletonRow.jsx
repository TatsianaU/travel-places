import './TravelFeedSkeletonRow.css'

import Skeleton from '../Skeleton/Skeleton'

export default function TravelFeedSkeletonRow({ rowHeight }) {
  const heightValue = typeof rowHeight === 'number' ? `${rowHeight}px` : rowHeight

  return (
    <div
      className="travel-feed-skeleton-row"
      style={{ height: heightValue }}
      aria-hidden="true"
    >
      <div className="travel-feed-skeleton-card">
        <div className="travel-feed-skeleton-top">
          <Skeleton
            width="72px"
            height="22px"
            radius="999px"
          />
          <Skeleton
            width="56px"
            height="12px"
          />
        </div>

        <Skeleton
          className="travel-feed-skeleton-title"
          width="68%"
          height="17px"
        />

        <div className="travel-feed-skeleton-excerpt">
          <Skeleton
            width="100%"
            height="12px"
          />
          <Skeleton
            width="92%"
            height="12px"
          />
        </div>

        <div className="travel-feed-skeleton-meta">
          <Skeleton
            width="88px"
            height="12px"
          />
          <Skeleton
            width="64px"
            height="12px"
          />
          <Skeleton
            width="40px"
            height="12px"
          />
          <Skeleton
            width="96px"
            height="12px"
          />
        </div>
      </div>
    </div>
  )
}
