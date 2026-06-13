import './PlaceCard.css'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CheckCircle, Star, Heart } from 'lucide-react'

const STATUS_CONFIG = {
  visited: {
    icon: CheckCircle,
    label: 'Посещено',
  },
  planned: {
    icon: Calendar,
    label: 'Планируется',
  },
  wishlist: {
    icon: Star,
    label: 'В список желаний',
  },
}

export default function PlaceCard({
  id,
  title,
  description,
  country,
  city,
  imageUrl,
  status,
  visitedYear,
  children,
  onEdit,
  isInWishlist,
  onToggleWishlist,
}) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const statusConfig = status ? STATUS_CONFIG[status] : null
  const StatusIcon = statusConfig?.icon

  return (
    <div className="place-card">
      <img
        className="place-card-image"
        src={imageUrl}
        alt={title}
      />

      <div className="place-card-content">
        <h2 className="place-card-title">{id ? <Link to={`/places/${id}`}>{title}</Link> : title}</h2>

        <div className="place-card-actions">
          <span className="place-card-country">{city ? `${country} — ${city}` : country}</span>

          <button
            className={showDetails ? 'details-button active' : 'details-button'}
            onClick={toggleDetails}
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>

          {onToggleWishlist && (
            <button
              className={`place-card-button ${isInWishlist ? 'place-card-button--active' : ''}`}
              type="button"
              onClick={onToggleWishlist}
              title={isInWishlist ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              {isInWishlist ? '❤️ Убрать из избранного' : '🤍 В избранное'}
            </button>
          )}

          {onEdit && (
            <button
              className="place-card-button place-card-button--secondary"
              type="button"
              onClick={onEdit}
            >
              Edit
            </button>
          )}
        </div>

        <div className="place-card-badges">
          {statusConfig && (
            <span className={`place-card-status place-card-status--${status}`}>
              <StatusIcon size={14} />
              {statusConfig.label}
            </span>
          )}

          {isInWishlist && (
            <span className="place-card-favorite">
              <Heart size={14} />
              Избранное
            </span>
          )}
        </div>

        {status === 'visited' && visitedYear && <p className="place-card-visited-year">Посещено в {visitedYear}</p>}

        {showDetails && <p className="place-card-description">{description}</p>}

        {/* children - это все, что передано между <PlaceCard></PlaceCard> */}
        {/* Если children не переданы, блок не отрисуется */}

        {children}
      </div>
    </div>
  )
}
