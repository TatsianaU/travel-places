import './CompareBar.css'

import { Link } from 'react-router-dom'

import { useComparePlacesStore } from '../../features/comparePlaces/comparePlacesStore'
import { useAllPlacesQuery } from '../../features/places/useAllPlacesQuery'

export default function CompareBar() {
  const compareIds = useComparePlacesStore((state) => state.compareIds)
  const clearCompare = useComparePlacesStore((state) => state.clearCompare)
  const placesQuery = useAllPlacesQuery()

  if (compareIds.length === 0) {
    return null
  }

  const places = placesQuery.data ?? []
  const comparePlaces = compareIds
    .map((id) => places.find((place) => place.id === id))
    .filter((place) => place != null)

  return (
    <aside className="compare-bar">
      <div className="compare-bar__inner">
        <p className="compare-bar__count">К сравнению: {compareIds.length}</p>

        <ul className="compare-bar__list">
          {comparePlaces.map((place) => (
            <li key={place.id}>
              <Link
                className="compare-bar__link"
                to={`/places/${place.id}`}
              >
                {place.title}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="compare-bar__clear"
          onClick={clearCompare}
        >
          Очистить
        </button>
      </div>
    </aside>
  )
}
