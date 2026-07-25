import './HomePage.css'

import { Link } from 'react-router-dom'

import { useAllPlacesQuery } from '../../features/places/useAllPlacesQuery'
import { useRecentPlaces } from '../../features/recentPlaces/useRecentPlaces'

export default function HomePage() {
  const { recentIds, clearRecent } = useRecentPlaces()
  const placesQuery = useAllPlacesQuery()

  const places = placesQuery.data ?? []
  const recentPlaces = recentIds
    .map((id) => places.find((place) => place.id === id))
    .filter((place) => place != null)

  return (
    <section className="home-page">
      <div className="home-page__box">
        <h1 className="home-page__title">Добро пожаловать в Travel Places</h1>
        <p className="home-page__text">
          Travel Places помогает хранить список мест, которые вы уже посетили, планируете посетить или мечтаете увидеть.
        </p>
        <Link
          className="home-page__button"
          to="/places"
        >
          Смотреть все места
        </Link>
      </div>

      {recentPlaces.length > 0 && (
        <section className="home-page__recent">
          <div className="home-page__recent-header">
            <h2 className="home-page__recent-title">Вы недавно смотрели</h2>
            <button
              type="button"
              className="home-page__recent-clear"
              onClick={clearRecent}
            >
              Очистить историю
            </button>
          </div>

          <ul className="home-page__recent-list">
            {recentPlaces.map((place) => (
              <li key={place.id}>
                <Link
                  className="home-page__recent-link"
                  to={`/places/${place.id}`}
                >
                  {place.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
