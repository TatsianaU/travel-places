import './FavoritesPage.css'

import { Link, useNavigate } from 'react-router-dom'

import PlaceList from '../../components/PlaceList/PlaceList'
import Spinner from '../../components/Spinner/Spinner'
import { useFavorites } from '../../features/favorites/useFavorites'
import { useAllPlacesQuery } from '../../features/places/useAllPlacesQuery'
import { useToasts } from '../../features/toasts/useToasts'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const { favoriteIds, toggleFavorite, clearFavorites } = useFavorites()
  const placesQuery = useAllPlacesQuery()
  const { showToast } = useToasts()

  const places = placesQuery.data ?? []
  const favorites = favoriteIds
    .map((id) => places.find((place) => place.id === id))
    .filter((place) => place != null)

  function handleClearFavorites() {
    clearFavorites()
    showToast('Избранное очищено')
  }

  return (
    <main className="favorites-page">
      <h1 className="favorites-page-title">Избранное</h1>

      {favoriteIds.length === 0 ? (
        <div className="favorites-empty">
          <p className="favorites-empty-title">В избранном пока пусто.</p>
          <p className="favorites-empty-hint">
            Добавляйте места в избранное на странице «Места».
          </p>
          <Link
            to="/places"
            className="favorites-empty-link"
          >
            Перейти к местам
          </Link>
        </div>
      ) : placesQuery.isPending ? (
        <Spinner />
      ) : (
        <>
          <PlaceList
            places={favorites}
            searchQuery=""
            onEdit={(place) => navigate(`/places/${place.id}/edit`)}
            wishlistIds={favoriteIds}
            onToggleWishlist={toggleFavorite}
          />

          <button
            type="button"
            className="favorites-clear"
            onClick={handleClearFavorites}
          >
            Очистить избранное
          </button>
        </>
      )}
    </main>
  )
}
