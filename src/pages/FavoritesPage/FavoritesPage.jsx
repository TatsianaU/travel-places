import './FavoritesPage.css'

import { Link, useNavigate } from 'react-router-dom'

import PlaceList from '../../components/PlaceList/PlaceList'
import { useFavoritePlaces } from '../../features/places/useFavoritePlaces'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, favoriteIds, toggleFavorite } = useFavoritePlaces()

  return (
    <main className="favorites-page">
      <h1 className="favorites-page-title">Избранное</h1>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p className="favorites-empty-title">В избранном пока пусто.</p>
          <p className="favorites-empty-hint">
            Добавляйте места в избранное на странице «Места». Место появится здесь после того, как вы откроете его страницу с деталями.
          </p>
          <Link
            to="/places"
            className="favorites-empty-link"
          >
            Перейти к местам
          </Link>
        </div>
      ) : (
        <PlaceList
          places={favorites}
          searchQuery=""
          onEdit={(place) => navigate(`/places/${place.id}/edit`)}
          wishlistIds={favoriteIds}
          onToggleWishlist={toggleFavorite}
        />
      )}
    </main>
  )
}
