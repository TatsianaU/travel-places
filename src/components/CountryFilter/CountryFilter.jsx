import './CountryFilter.css'

export default function CountryFilter({ countries, selectedCountry, onCountryChange }) {
  return (
    <div className="country-filter">
      <button
        className={selectedCountry === 'All' ? 'filter-button active' : 'filter-button'}
        onClick={() => onCountryChange('All')}
      >
        All
      </button>

      {countries.map((country) => (
        <button
          key={country}
          className={selectedCountry === country ? 'filter-button active' : 'filter-button'}
          onClick={() => onCountryChange(country)}
        >
          {country}
        </button>
      ))}
    </div>
  )
}
