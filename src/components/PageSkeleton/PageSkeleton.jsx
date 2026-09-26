import './PageSkeleton.css'

import Skeleton from '../Skeleton/Skeleton'

export default function PageSkeleton() {
  return (
    <div
      className="page-skeleton"
      aria-busy="true"
    >
      <Skeleton
        width="240px"
        height="32px"
      />

      <div className="page-skeleton-blocks">
        <Skeleton height="120px" />
        <Skeleton height="120px" />
        <Skeleton height="120px" />
      </div>
    </div>
  )
}
