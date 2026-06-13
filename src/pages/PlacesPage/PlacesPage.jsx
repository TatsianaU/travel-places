import './PlacesPage.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { fetchPlaces } from '../../api/places'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import ClickCounter from '../../components/ClickCounter/ClickCounter'
import Clock from '../../components/Clock/Clock'
import CountryFilter from '../../components/CountryFilter/CountryFilter'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Greeting from '../../components/Greeting/Greeting'
import MousePosition from '../../components/MousePosition/MousePosition'
import PlaceList from '../../components/PlaceList/PlaceList'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Section from '../../components/Section/Section'
import Spinner from '../../components/Spinner/Spinner'

export default function PlacesPage() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMouseVisible, setIsMouseVisible] = useState(true)
  const [wishlistIds, setWishlistIds] = useLocalStorage('wishlistIds', [])

  const [placesState, setPlacesState] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function loadPlaces() {
    setIsLoading(true)
    setError(null)

    try {
      const loadedPlaces = await fetchPlaces()
      setPlacesState(loadedPlaces)
    } catch {
      setError('Не удалось загрузить данные')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPlaces()
  }, [])

  useEffect(() => {
    const trimmedQuery = searchQuery.trim()

    if (trimmedQuery === '') {
      document.title = 'Travel Places'
    } else {
      document.title = `Поиск: ${trimmedQuery} — Travel Places`
    }

    return () => {
      document.title = 'Travel Places'
    }
  }, [searchQuery])

  const countries = [...new Set(placesState.map((place) => place.country))]

  function handleToggleWishlist(id) {
    setWishlistIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((wishlistId) => wishlistId !== id)
      }

      return [...prev, id]
    })
  }

  const filteredPlaces = placesState
    .filter((place) => selectedCountry === 'All' || place.country === selectedCountry)
    .filter(
      (place) =>
        searchQuery.trim() === '' ||
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.country.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="places-page">
      <Greeting name="Татьяна" />

      <div className="top-panel">
        <Clock />
        <ClickCounter />
      </div>

      <div className="mouse-position-toggle">
        <button onClick={() => setIsMouseVisible((prev) => !prev)}>Скрыть / Показать</button>
      </div>

      {isMouseVisible && <MousePosition />}

      <SearchFilter
        query={searchQuery}
        onQueryChange={setSearchQuery}
      />

      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />

      <main>
        <div className="places-page-actions">
          <Link
            to="/places/new"
            className="places-page-add-link"
          >
            Добавить место
          </Link>
        </div>

        <Section title="Популярные направления">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage
              message={error}
              onRetry={loadPlaces}
            />
          ) : (
            <PlaceList
              places={filteredPlaces}
              searchQuery={searchQuery}
              onEdit={(place) => navigate(`/places/${place.id}/edit`)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </Section>
      </main>
    </div>
  )
}
