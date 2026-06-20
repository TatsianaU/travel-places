import './PlaceFormPage.css'

import { Link, useNavigate } from 'react-router-dom'

import PlaceForm from '../components/PlaceForm/PlaceForm'
import { useCreatePlace } from '../features/places/usePlaceMutation'

export default function CreatePlacePage() {
  const navigate = useNavigate()
  const createPlaceMutation = useCreatePlace()

  async function handleCreatePlace(newPlace) {
    const createdPlace = await createPlaceMutation.mutateAsync(newPlace)
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
