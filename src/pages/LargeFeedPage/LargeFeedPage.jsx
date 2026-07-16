import './LargeFeedPage.css'

import { useState } from 'react'

import InfiniteScrollTravelPosts from '../../components/TravelFeed/InfiniteScrollTravelPosts'
import LoadMoreTravelPosts from '../../components/TravelFeed/LoadMoreTravelPosts'

const MODES = [
  { id: 'button', label: 'Кнопка', hint: 'Базовый функционал: следующая страница загружается по клику' },
  { id: 'infinite', label: 'Автоподгрузка', hint: 'Базовый функционал + IntersectionObserver: страницы грузятся при скролле' },
]

export default function LargeFeedPage() {
  const [mode, setMode] = useState('infinite')
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

      <div className="large-feed-body">
        {mode === 'button' && <LoadMoreTravelPosts />}
        {mode === 'infinite' && <InfiniteScrollTravelPosts />}
      </div>
    </section>
  )
}
