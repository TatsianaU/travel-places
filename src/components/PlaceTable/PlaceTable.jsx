import './PlaceTable.css'

const statusLabelMap = {
  visited: 'Посещено',
  planned: 'Планируется',
  wishlist: 'В список желаний',
}

export default function PlaceTable({ places }) {
  if (places.length === 0) {
    return <p className="place-table-empty">Ничего не найдено</p>
  }

  return (
    <div className="place-table-wrapper">
      <table className="place-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Статус</th>
            <th>Год</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.id}>
              <td>{place.title}</td>
              <td>{place.country}</td>
              <td>{place.status ? (statusLabelMap[place.status] ?? place.status) : '-'}</td>
              <td>{place.visitedYear || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
