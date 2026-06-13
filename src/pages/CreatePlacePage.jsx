import './PlaceFormPage.css'

import { Link, useNavigate } from 'react-router-dom'

import { createPlace } from '../api/places'
import PlaceForm from '../components/PlaceForm/PlaceForm'

export default function CreatePlacePage() {
  const navigate = useNavigate()

  async function handleCreatePlace(newPlace) {
    const createdPlace = await createPlace(newPlace)
    navigate(`/places/${createdPlace.id}`)
    return createdPlace
  }

  return (
    <main className="place-form-page">
      <Link
        to="/places"
        className="place-form-back-link"
      >
        Назад к списку
      </Link>

      <PlaceForm onAddPlace={handleCreatePlace} />

      <Link
        to="/places"
        className="place-form-cancel"
      >
        Отмена
      </Link>
    </main>
  )
}
