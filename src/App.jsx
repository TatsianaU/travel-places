import './App.css'

import { useState } from 'react'

import ClickCounter from './components/ClickCounter/ClickCounter'
import CountryFilter from './components/CountryFilter/CountryFilter'
import Footer from './components/Footer/Footer'
import Greeting from './components/Greeting/Greeting'
import Header from './components/Header/Header'
import PlaceList from './components/PlaceList/PlaceList'
import Section from './components/Section/Section'
import { places } from './data/places'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('All')

  const countries = [...new Set(places.map((place) => place.country))]

  const filteredPlaces = selectedCountry === 'All' ? places : places.filter((place) => place.country === selectedCountry)

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
        <Section title="Популярные направления">
          <PlaceList places={filteredPlaces} />
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App
