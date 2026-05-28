import './PlaceList.css'

import PlaceCard from '../PlaceCard/PlaceCard'

export default function PlaceList({ places, searchQuery }) {
  return (
    <section className="place-list-section">
      {searchQuery.trim() !== '' && <p className="place-list-count">Найдено мест: {places.length}</p>}

      {places.length === 0 && <p className="place-list-empty">Ничего не найдено по вашему запросу.</p>}

      <div className="place-list">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            title={place.title}
            description={place.description}
            country={place.country}
            city={place.city}
            imageUrl={place.imageUrl}
          >
            <p className="place-list-note">Добавлено в ваш список желаний</p>
          </PlaceCard>
        ))}
      </div>
    </section>
  )
}
