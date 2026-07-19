import './LargeFeedPage.css'

import { useState } from 'react'

import InfiniteScrollTravelPosts from '../../components/TravelFeed/InfiniteScrollTravelPosts'
import LoadMoreTravelPosts from '../../components/TravelFeed/LoadMoreTravelPosts'
import VirtualizedTravelPosts from '../../components/TravelFeed/VirtualizedTravelPosts'
import { TRAVEL_POST_CATEGORY_LABEL } from '../../data/travelPosts'

const MODES = [
  { id: 'button', label: 'Кнопка', hint: 'Базовый функционал: следующая страница загружается по клику' },
  { id: 'infinite', label: 'Автоподгрузка', hint: 'Базовый функционал + IntersectionObserver: страницы грузятся при скролле' },
  { id: 'virtual', label: 'Виртуализация', hint: 'Большая выборка в памяти: в DOM только видимые карточки + overscan' },
]

export default function LargeFeedPage() {
  const [mode, setMode] = useState('infinite')
  const [category, setCategory] = useState('')
  const activeMode = MODES.find((item) => item.id === mode)

  return (
    <section className="large-feed-page">
      <header className="large-feed-header">
        <h1 className="large-feed-title">Большая лента</h1>
        <p className="large-feed-intro">Страница демонстрации подгрузки лент. Переключайте режимы и сравнивайте поведение.</p>
      </header>

      <div
        className="large-feed-modes"
        role="group"
        aria-label="Режим демонстрации видов больших лент"
      >
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === mode ? 'large-feed-mode large-feed-mode--active' : 'large-feed-mode'}
            onClick={() => setMode(item.id)}
            aria-pressed={item.id === mode}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeMode && <p className="large-feed-mode-hint">{activeMode.hint}</p>}

      <div className="large-feed-filters">
        <label
          className="large-feed-filter"
          htmlFor="travel-category-filter"
        >
          Категория
          <select
            id="travel-category-filter"
            className="large-feed-filter-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Все</option>
            {Object.entries(TRAVEL_POST_CATEGORY_LABEL).map(([value, label]) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="large-feed-body">
        {mode === 'button' && <LoadMoreTravelPosts category={category} />}
        {mode === 'infinite' && <InfiniteScrollTravelPosts category={category} />}
        {mode === 'virtual' && <VirtualizedTravelPosts category={category} />}
      </div>
    </section>
  )
}
