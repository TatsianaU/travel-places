import './PlaceDetailsPage.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { deletePlace, fetchPlace } from '../../api/places'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Spinner from '../../components/Spinner/Spinner'

export default function PlaceDetailsPage() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()

  async function loadPlace() {
    setIsLoading(true)
    setError(null)
    setNotFound(false)

    try {
      const loadedPlace = await fetchPlace(id)

      if (loadedPlace === null) {
        setNotFound(true)
        setPlace(null)
        return
      }

      setPlace(loadedPlace)
    } catch {
      setError('Не удалось загрузить данные')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function load() {
      await loadPlace()
    }

    load()
  }, [id])

  async function handleDeletePlace() {
    try {
      await deletePlace(id)

      navigate('/places')
    } catch {
      setError('Не удалось удалить место')
    }
  }

  if (isLoading) {
    return (
      <main className="place-details-page">
        <Spinner />
      </main>
    )
  }

  if (error) {
    return (
      <main className="place-details-page">
        <ErrorMessage
          message={error}
          onRetry={loadPlace}
        />
      </main>
    )
  }

  if (notFound) {
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

  if (!place) {
    return null
  }

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
          >
            Удалить
          </button>
        </div>
      </article>
    </main>
  )
}
