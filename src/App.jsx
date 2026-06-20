import './App.css'

import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import AboutPage from './pages/AboutPage/AboutPage'
import CreatePlacePage from './pages/CreatePlacePage'
import EditPlacePage from './pages/EditPlacePage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import PlaceDetailsPage from './pages/PlaceDetailsPage/PlaceDetailsPage'
import PlacesPage from './pages/PlacesPage/PlacesPage'

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app__content">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/places"
            element={<PlacesPage />}
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
      </div>

      <Footer />
    </div>
  )
}

export default App
