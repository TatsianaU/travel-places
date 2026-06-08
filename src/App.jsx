import './App.css'

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import PlacesPage from './pages/PlacesPage/PlacesPage'
import PlaceDetailsPage from './pages/PlaceDetailsPage/PlaceDetailsPage'
import AboutPage from './pages/AboutPage/AboutPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

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
