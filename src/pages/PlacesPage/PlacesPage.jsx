import './PlacesPage.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { fetchPlaces } from '../../api/places'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import ClickCounter from '../../components/ClickCounter/ClickCounter'
import Clock from '../../components/Clock/Clock'
import CountryFilter from '../../components/CountryFilter/CountryFilter'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Greeting from '../../components/Greeting/Greeting'
import MousePosition from '../../components/MousePosition/MousePosition'
import PlaceList from '../../components/PlaceList/PlaceList'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Section from '../../components/Section/Section'
import Spinner from '../../components/Spinner/Spinner'
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher'
import PlaceTable from '../../components/PlaceTable/PlaceTable'

export default function PlacesPage() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [isMouseVisible, setIsMouseVisible] = useState(true)
  const [wishlistIds, setWishlistIds] = useLocalStorage('wishlistIds', [])
  const [searchParams, setSearchParams] = useSearchParams()

  const [placesState, setPlacesState] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const countries = [...new Set(placesState.map((place) => place.country))]
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? ''
  const favorites = searchParams.get('favorites') ?? ''
  const sort = searchParams.get('sort') ?? ''
  const view = searchParams.get('view') ?? ''

  const ALLOWED_SORTS = ['title', 'country']
  const ALLOWED_VIEWS = ['cards', 'table']
  const DEFAULT_VIEW = 'cards'

  const sortValue = ALLOWED_SORTS.includes(sort) ? sort : ''
  const viewValue = ALLOWED_VIEWS.includes(view) ? view : DEFAULT_VIEW
  const hasActiveFilters =
    search.trim() !== '' || status !== '' || favorites !== '' || selectedCountry !== 'All' || sortValue !== '' || viewValue !== DEFAULT_VIEW

  const statusLabelMap = {
    visited: 'Посещено',
    planned: 'Планируется',
    wishlist: 'В список желаний',
  }

  const activeFilters = []

  if (search.trim() !== '') {
    activeFilters.push(`Поиск: "${search}"`)
  }

  if (selectedCountry !== 'All') {
    activeFilters.push(`Страна: ${selectedCountry}`)
  }

  if (status) {
    activeFilters.push(`Статус: ${statusLabelMap[status] ?? status}`)
  }

  const sortLabelMap = {
    title: 'По названию',
    country: 'По стране',
  }

  const viewLabelMap = {
    cards: 'Карточки',
    table: 'Таблица',
  }

  if (sortValue) {
    activeFilters.push(sortLabelMap[sortValue])
  }

  if (viewValue !== DEFAULT_VIEW) {
    activeFilters.push(viewLabelMap[viewValue])
  }

  if (favorites) {
    activeFilters.push('Только избранное')
  }

  async function loadPlaces() {
    setIsLoading(true)
    setError(null)

    try {
      const loadedPlaces = await fetchPlaces()
      setPlacesState(loadedPlaces)
    } catch {
      setError('Не удалось загрузить данные')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPlaces()
  }, [])

  useEffect(() => {
    const trimmedSearch = search.trim()

    if (trimmedSearch === '') {
      document.title = 'Travel Places'
    } else {
      document.title = `Поиск: ${trimmedSearch} — Travel Places`
    }

    return () => {
      document.title = 'Travel Places'
    }
  }, [search])

  function updateParam(key, value) {
    const nextParams = new URLSearchParams(searchParams)

    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }

    setSearchParams(nextParams)
  }

  function handleToggleFavorites() {
    if (favorites) {
      updateParam('favorites', '')
      return
    }

    updateParam('favorites', '1')
  }

  function handleToggleWishlist(id) {
    setWishlistIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((wishlistId) => wishlistId !== id)
      }

      return [...prev, id]
    })
  }

  const filteredPlaces = placesState
    .filter((place) => selectedCountry === 'All' || place.country === selectedCountry)
    .filter(
      (place) =>
        search.trim() === '' ||
        place.title.toLowerCase().includes(search.toLowerCase()) ||
        place.description.toLowerCase().includes(search.toLowerCase()) ||
        place.country.toLowerCase().includes(search.toLowerCase())
    )
    .filter((place) => {
      if (!status) {
        return true
      }

      return place.status === status
    })
    .filter((place) => {
      if (!favorites) {
        return true
      }

      return wishlistIds.includes(place.id)
    })

  const sortedPlaces = sortValue ? [...filteredPlaces].sort((a, b) => a[sortValue].localeCompare(b[sortValue], 'ru')) : filteredPlaces

  return (
    <div className="places-page">
      <Greeting name="Татьяна" />

      <div className="top-panel">
        <Clock />
        <ClickCounter />
      </div>

      <div className="mouse-position-toggle">
        <button onClick={() => setIsMouseVisible((prev) => !prev)}>Скрыть / Показать</button>
      </div>

      {isMouseVisible && <MousePosition />}

      <SearchFilter
        query={search}
        onQueryChange={(value) => updateParam('search', value)}
      />

      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />

      <div className="places-page-controls">
        <div className="status-filter">
          <label htmlFor="status-select">Статус</label>
          <select
            id="status-select"
            value={status}
            onChange={(event) => updateParam('status', event.target.value)}
          >
            <option value="">Все</option>
            <option value="visited">Посещено</option>
            <option value="planned">Планируется</option>
            <option value="wishlist">В список желаний</option>
          </select>
        </div>

        <div className="sort-filter">
          <label htmlFor="sort-select">Сортировка</label>
          <select
            id="sort-select"
            value={sortValue}
            onChange={(event) => updateParam('sort', event.target.value)}
          >
            <option value="">По умолчанию</option>
            <option value="title">По названию</option>
            <option value="country">По стране</option>
          </select>
        </div>

        <ViewSwitcher
          value={viewValue}
          onChange={(next) => updateParam('view', next === DEFAULT_VIEW ? '' : next)}
        />

        <div className="favorites-filter">
          <label>
            <input
              type="checkbox"
              checked={favorites !== ''}
              onChange={handleToggleFavorites}
            />
            Только избранное
          </label>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <strong>Активные фильтры:</strong> {activeFilters.join(', ')}
        </div>
      )}

      <main>
        <div className="places-page-actions">
          <Link
            to="/places/new"
            className="places-page-add-link"
          >
            Добавить место
          </Link>
        </div>

        <Section title="Популярные направления">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage
              message={error}
              onRetry={loadPlaces}
            />
          ) : viewValue === 'table' ? (
            <PlaceTable places={sortedPlaces} />
          ) : (
            <PlaceList
              places={sortedPlaces}
              searchQuery={search}
              onEdit={(place) => navigate(`/places/${place.id}/edit`)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </Section>
      </main>
    </div>
  )
}
