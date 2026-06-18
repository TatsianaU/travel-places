import './PlaceFormPage.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { fetchPlace, updatePlace } from '../api/places'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import PlaceForm from '../components/PlaceForm/PlaceForm'
import Spinner from '../components/Spinner/Spinner'

export default function EditPlacePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [place, setPlace] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)

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
    loadPlace()
  }, [id])

  async function handleUpdatePlace(placeId, updatedPlace) {
    const updated = await updatePlace(placeId, updatedPlace)
    navigate(`/places/${updated.id}`)
    return updated
  }

  if (isLoading) {
    return (
      <main className="place-form-page">
        <Spinner />
      </main>
    )
  }

  if (error) {
    return (
      <main className="place-form-page">
        <ErrorMessage
          message={error}
          onRetry={loadPlace}
        />
      </main>
    )
  }

  if (notFound) {
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
        placeToEdit={place}
        onUpdatePlace={handleUpdatePlace}
        onCancelEdit={() => navigate(`/places/${id}`)}
      />
    </main>
  )
}
