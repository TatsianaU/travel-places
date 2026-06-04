import './PlaceCard.css'

import { useState } from 'react'

export default function PlaceCard({ title, description, country, city, imageUrl, visitedYear, children, onEdit }) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="place-card">
      <img
        className="place-card-image"
        src={imageUrl}
        alt={title}
      />

      <div className="place-card-content">
        <h2 className="place-card-title">{title}</h2>

        <div className="place-card-actions">
          <span className="place-card-country">{city ? `${country} — ${city}` : country}</span>

          <button
            className={showDetails ? 'details-button active' : 'details-button'}
            onClick={toggleDetails}
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
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

        {visitedYear && <p className="place-card-visited-year">Посещено в {visitedYear}</p>}

        {showDetails && <p className="place-card-description">{description}</p>}

        {/* children - это все, что передано между <PlaceCard></PlaceCard> */}
        {/* Если children не переданы, блок не отрисуется */}

        {children}
      </div>
    </div>
  )
}
