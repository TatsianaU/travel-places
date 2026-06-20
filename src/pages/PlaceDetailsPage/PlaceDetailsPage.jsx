import './PlaceDetailsPage.css'

import { Link, useNavigate, useParams } from 'react-router-dom'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Spinner from '../../components/Spinner/Spinner'
import { useDeletePlace } from '../../features/places/usePlaceMutation'
import { usePlaceQuery } from '../../features/places/usePlaceQuery'

export default function PlaceDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const placeQuery = usePlaceQuery(id)
  const deletePlaceMutation = useDeletePlace()

  async function handleDeletePlace() {
    await deletePlaceMutation.mutateAsync(id)
    navigate('/places')
  }

  if (placeQuery.isLoading) {
    return (
      <main className="place-details-page">
        <Spinner />
      </main>
    )
  }

  if (placeQuery.isError) {
    return (
      <main className="place-details-page">
        <ErrorMessage
          message="Не удалось загрузить данные"
          onRetry={placeQuery.refetch}
        />
      </main>
    )
  }

  if (placeQuery.data === null) {
    return (
      <main className="place-details-page">
        <div className="place-details-empty">
          <h1 className="place-details-empty-title">Место не найдено.</h1>
          <p className="place-details-empty-text">Возможно, такого места не существует.</p>
          <Link
            to="/places"
            className="place-details-back-link"
          >
            Назад к списку
          </Link>
        </div>
      </main>
    )
  }

  const place = placeQuery.data

  return (
    <main className="place-details-page">
      <article className="place-details-card">
        <img
          className="place-details-image"
          src={place.imageUrl}
          alt={place.title}
        />

        <div className="place-details-content">
          <h1 className="place-details-title">{place.title}</h1>
          <p className="place-details-id">Идентификатор места: {id}</p>
          <p className="place-details-location">{place.city ? `${place.country} — ${place.city}` : place.country}</p>
          <p className="place-details-description">{place.description}</p>
          {place.status === 'visited' && place.visitedYear && <p className="place-details-year">Год посещения: {place.visitedYear}</p>}

          <Link
            to="/places"
            className="place-details-back-link"
          >
            Назад к списку
          </Link>
          <Link
            to={`/places/${id}/edit`}
            className="place-details-back-link place-details-back-link--secondary"
          >
            Редактировать
          </Link>
          <button
            type="button"
            onClick={handleDeletePlace}
            className="place-details-delete"
            disabled={deletePlaceMutation.isPending}
          >
            {deletePlaceMutation.isPending ? 'Удаление...' : 'Удалить'}
          </button>

          {deletePlaceMutation.isError && <p className="place-details-error">Не удалось удалить место</p>}
        </div>
      </article>
    </main>
  )
}
