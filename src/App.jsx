import './App.css'

import { useEffect, useState } from 'react'

import { createPlace, fetchPlaces } from './api/places'
import AddPlaceForm from './components/AddPlaceForm/AddPlaceForm'
import ClickCounter from './components/ClickCounter/ClickCounter'
import CountryFilter from './components/CountryFilter/CountryFilter'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import Footer from './components/Footer/Footer'
import Greeting from './components/Greeting/Greeting'
import Header from './components/Header/Header'
import PlaceList from './components/PlaceList/PlaceList'
import SearchFilter from './components/SearchFilter/SearchFilter'
import Section from './components/Section/Section'
import Spinner from './components/Spinner/Spinner'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [placesState, setPlacesState] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleAddPlace(newPlace) {
    try {
      const createdPlace = await createPlace(newPlace)
      setPlacesState((prev) => [...prev, createdPlace])
    } catch (error) {
      console.error(error)
    }
  }

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

  const countries = [...new Set(placesState.map((place) => place.country))]

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
    <div className="app">
      <Header />

      <Greeting name="Татьяна" />

      <ClickCounter />

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
        <AddPlaceForm onAddPlace={handleAddPlace} />

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
              selectedCountry={selectedCountry}
              searchQuery={searchQuery}
            />
          )}
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App
