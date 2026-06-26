import './PlaceFormPage.css'

import { Link, useNavigate, useParams } from 'react-router-dom'

import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import PlaceForm from '../components/PlaceForm/PlaceForm'
import Spinner from '../components/Spinner/Spinner'
import { usePlaceQuery } from '../features/places/usePlaceQuery'
import { useUpdatePlace } from '../features/places/usePlaceMutation'

export default function EditPlacePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const placeQuery = usePlaceQuery(id)
  const updatePlaceMutation = useUpdatePlace()

  async function handleUpdatePlace(placeId, updatedPlace) {
    const updated = await updatePlaceMutation.mutateAsync({ id: placeId, data: updatedPlace })
    navigate(`/places/${updated.id}`)
    return updated
  }

  if (placeQuery.isLoading) {
    return (
      <main className="place-form-page">
        <Spinner />
      </main>
    )
  }

  if (placeQuery.isError) {
    return (
      <main className="place-form-page">
        <ErrorMessage
          message="Не удалось загрузить данные"
          onRetry={placeQuery.refetch}
        />
      </main>
    )
  }

  if (placeQuery.data === null) {
    return (
      <main className="place-form-page">
        <div className="place-details-empty">
          <h1 className="place-details-empty-title">Место не найдено.</h1>
          <p className="place-details-empty-text">Возможно, такого места не существует.</p>
          <Link
            to="/places"
            className="place-form-back-link"
          >
            Назад к списку
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="place-form-page">
      <Link
        to="/places"
        className="place-form-back-link"
      >
        Назад к списку
      </Link>

      <PlaceForm
        placeToEdit={placeQuery.data}
        onUpdatePlace={handleUpdatePlace}
        onCancelEdit={() => navigate(`/places/${id}`)}
      />
    </main>
  )
}
