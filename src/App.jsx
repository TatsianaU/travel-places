import './App.css'

import { useEffect, useState } from 'react'

import AddPlaceForm from './components/AddPlaceForm/AddPlaceForm'
import ClickCounter from './components/ClickCounter/ClickCounter'
import CountryFilter from './components/CountryFilter/CountryFilter'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import Footer from './components/Footer/Footer'
import Greeting from './components/Greeting/Greeting'
import Header from './components/Header/Header'
import PlaceList from './components/PlaceList/PlaceList'
import Section from './components/Section/Section'
import Spinner from './components/Spinner/Spinner'
import { places } from './data/places'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('All')

  const [placesState, setPlacesState] = useState(places)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleAddPlace(newPlace) {
    setPlacesState((prev) => [...prev, newPlace])
  }

  async function loadPlaces() {
    setIsLoading(true)

    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // throw new Error('Сервер недоступен')

      setPlacesState(places)
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

  const filteredPlaces = selectedCountry === 'All' ? placesState : placesState.filter((place) => place.country === selectedCountry)

  return (
    <div className="app">
      <Header />

      <Greeting name="Татьяна" />

      <ClickCounter />

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
            />
          )}
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App
