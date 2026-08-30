import './App.css'

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import CompareBar from './components/CompareBar/CompareBar'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import ErrorFallback from './components/ErrorBoundary/ErrorFallback'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import PageSkeleton from './components/PageSkeleton/PageSkeleton'
import AboutPage from './pages/AboutPage/AboutPage'
import CreatePlacePage from './pages/CreatePlacePage'
import EditPlacePage from './pages/EditPlacePage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import PlaceDetailsPage from './pages/PlaceDetailsPage/PlaceDetailsPage'
import PlacesPage from './pages/PlacesPage/PlacesPage'

const loadLargeFeedPage = () => import('./pages/LargeFeedPage/LargeFeedPage')
const LargeFeedPage = lazy(loadLargeFeedPage)

function preloadLargeFeedPage() {
  return loadLargeFeedPage()
}

function App() {
  return (
    <div className="app">
      <Header onPreloadLargeFeed={preloadLargeFeedPage} />

      <div className="app__content">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            {/*
            throwOnError на PlacesPage: ошибка запроса уходит в границу, а не в JSX страницы.
            Плюс — меньше дублирования isError/refetch на каждой странице.
            Минус — при ошибке пропадает вся вёрстка страницы, а не только блок с данными.
            Для списка с фильтрами в реальном проекте чаще оставила бы локальный error UI.
          */}
            <Route
              path="/places"
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      label="страница мест"
                      fallback={({ error, reset: resetBoundary }) => (
                        <ErrorFallback
                          error={error}
                          what="эту страницу"
                          onRetry={() => {
                            reset()
                            resetBoundary()
                          }}
                        />
                      )}
                    >
                      <PlacesPage />
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              }
            />
            <Route
              path="/places/feed"
              element={<LargeFeedPage />}
            />
            <Route
              path="/favorites"
              element={<FavoritesPage />}
            />
            <Route
              path="/places/new"
              element={<CreatePlacePage />}
            />
            <Route
              path="/places/:id/edit"
              element={<EditPlacePage />}
            />
            <Route
              path="/places/:id"
              element={<PlaceDetailsPage />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Suspense>
      </div>

      <Footer />
      <CompareBar />
    </div>
  )
}

export default App
