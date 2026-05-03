import './PlaceList.css'

import PlaceCard from '../PlaceCard/PlaceCard'

export default function PlaceList({ places }) {
  return (
    <section className="place-list">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          title={place.title}
          description={place.description}
          country={place.country}
          imageUrl={place.imageUrl}
        >
          <p className="place-list-note">Добавлено в ваш список желаний</p>
        </PlaceCard>
      ))}
    </section>
  )
}
