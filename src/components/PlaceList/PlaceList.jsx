import './PlaceList.css'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ErrorFallback from '../ErrorBoundary/ErrorFallback'
import PlaceCard from '../PlaceCard/PlaceCard'

export default function PlaceList({ places, searchQuery, onEdit, wishlistIds, onToggleWishlist }) {
  return (
    <section className="place-list-section">
      {searchQuery.trim() !== '' && <p className="place-list-count">Найдено мест: {places.length}</p>}

      {places.length === 0 && <p className="place-list-empty">Ничего не найдено по вашему запросу.</p>}

      <div className="place-list">
        {/*
          Граница на уровне карточки: место - самостоятельная ячейка grid.
          Ошибка одной карточки не должна скрывать остальные.
          Вокруг кнопки "В избранное" граница избыточна - это действие внутри карточки, не отдельный виджет.
        */}
        {places.map((place) => (
          <ErrorBoundary
            key={place.id}
            fallback={({ error, reset }) => (
              <ErrorFallback
                error={error}
                onRetry={reset}
                what="это место"
              />
            )}
          >
            <PlaceCard
              id={place.id}
              title={place.title}
              description={place.description}
              country={place.country}
              city={place.city}
              imageUrl={place.imageUrl}
              status={place.status}
              visitedYear={place.visitedYear}
              onEdit={() => onEdit(place)}
              isInWishlist={wishlistIds.includes(place.id)}
              onToggleWishlist={() => onToggleWishlist(place.id)}
            />
          </ErrorBoundary>
        ))}
      </div>
    </section>
  )
}
