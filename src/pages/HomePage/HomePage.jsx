import './HomePage.css'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import RenderBugsExample from '../../components/RenderBugsExample/RenderBugsExample'
import { useAllPlacesQuery } from '../../features/places/useAllPlacesQuery'
import { useRecentPlaces } from '../../features/recentPlaces/useRecentPlaces'
import { useRenderCount, useRenderCountSafe } from '../../hooks/useRenderCount'

function RenderCountCompare() {
  const [tick, setTick] = useState(0)
  const impureCount = useRenderCount()
  const safeCount = useRenderCountSafe()

  return (
    <div className="render-count-compare">
      <section className="render-bugs-section">
        <h3 className="render-bugs-section-title render-count-compare__title">
          Сравнение счётчиков рендеров
        </h3>
        <dl className="render-model-readout render-count-compare__readout">
          <dt>useRenderCount</dt>
          <dd>{impureCount}</dd>
          <dt>useRenderCountSafe</dt>
          <dd>{safeCount}</dd>
          <dt>tick</dt>
          <dd>{tick}</dd>
        </dl>
        <button
          type="button"
          className="render-count-compare__button"
          onClick={() => setTick((prev) => prev + 1)}
        >
          Вызвать следующий render
        </button>
      </section>
    </div>
  )
}

export default function HomePage() {
  const { recentIds, clearRecent } = useRecentPlaces()
  const placesQuery = useAllPlacesQuery()

  const places = placesQuery.data ?? []
  const recentPlaces = recentIds
    .map((id) => places.find((place) => place.id === id))
    .filter((place) => place != null)

  return (
    <section className="home-page">
      <RenderCountCompare />
      <RenderBugsExample />

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
