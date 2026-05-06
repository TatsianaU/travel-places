import './App.css'

import Footer from './components/Footer/Footer'
import Greeting from './components/Greeting/Greeting'
import Header from './components/Header/Header'
import PlaceList from './components/PlaceList/PlaceList'
import Section from './components/Section/Section'
import { places } from './data/places'

function App() {
  return (
    <div className="app">
      <Header />
      <Greeting name="Татьяна" />

      <main>
        <Section title="Популярные направления">
          <PlaceList places={places} />
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App
