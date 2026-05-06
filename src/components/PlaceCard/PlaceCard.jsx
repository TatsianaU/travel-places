import './PlaceCard.css'

export default function PlaceCard({ title, description, country, imageUrl, children }) {
  return (
    <div className="place-card">
      <img
        className="place-card-image"
        src={imageUrl}
        alt={title}
      />

      <div className="place-card-content">
        <h2 className="place-card-title">{title}</h2>
        <span className="place-card-country">{country}</span>
        <p className="place-card-description">{description}</p>

        {/* children - это все, что передано между <PlaceCard></PlaceCard> */}
        {/* Если children не переданы, то этот блок просто не отрисуется */}
        {children}
      </div>
    </div>
  )
}
