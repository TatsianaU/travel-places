import './SearchFilter.css'

export default function SearchFilter({ query, onQueryChange }) {
  return (
    <div className="search-filter">
      <input
        className="search-input"
        type="text"
        placeholder="Поиск мест..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />

      {query.length > 0 && (
        <button
          className="clear-button"
          onClick={() => onQueryChange('')}
        >
          Очистить
        </button>
      )}
    </div>
  )
}
