import './PlacesPage.css'

import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { fetchPlacesPage } from '../../api/places'
import ClickCounter from '../../components/ClickCounter/ClickCounter'
import Clock from '../../components/Clock/Clock'
import CountryFilter from '../../components/CountryFilter/CountryFilter'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Greeting from '../../components/Greeting/Greeting'
import MousePosition from '../../components/MousePosition/MousePosition'
import Pagination from '../../components/Pagination/Pagination'
import PlaceList from '../../components/PlaceList/PlaceList'
import PlaceTable from '../../components/PlaceTable/PlaceTable'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Section from '../../components/Section/Section'
import Spinner from '../../components/Spinner/Spinner'
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const ALLOWED_SORTS = ['title', 'country']
const ALLOWED_VIEWS = ['cards', 'table']
const DEFAULT_VIEW = 'cards'

const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 5
const ALLOWED_PER_PAGE = [3, 5, 10]

const FILTER_KEYS_THAT_RESET_PAGE = ['search', 'status', 'sort', 'perPage']

const statusLabelMap = {
  visited: 'Посещено',
  planned: 'Планируется',
  wishlist: 'В список желаний',
}

const sortLabelMap = {
  title: 'По названию',
  country: 'По стране',
}

export default function PlacesPage() {
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [isMouseVisible, setIsMouseVisible] = useState(true)
  const [wishlistIds, setWishlistIds] = useLocalStorage('wishlistIds', [])
  const [searchParams, setSearchParams] = useSearchParams()

  const [data, setData] = useState([])
  const [pages, setPages] = useState(0)
  const [items, setItems] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? ''
  const favorites = searchParams.get('favorites') ?? ''
  const sort = searchParams.get('sort') ?? ''
  const view = searchParams.get('view') ?? ''
  const pageRaw = searchParams.get('page') ?? ''
  const perPageRaw = searchParams.get('perPage') ?? ''

  const sortValue = ALLOWED_SORTS.includes(sort) ? sort : ''
  const viewValue = ALLOWED_VIEWS.includes(view) ? view : DEFAULT_VIEW

  const parsedPage = Number(pageRaw)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_PAGE

  const parsedPerPage = Number(perPageRaw)
  const perPage = ALLOWED_PER_PAGE.includes(parsedPerPage) ? parsedPerPage : DEFAULT_PER_PAGE

  const countries = [...new Set(data.map((place) => place.country))]

  const hasActiveFilters = search.trim() !== '' || status !== '' || favorites !== '' || selectedCountry !== 'All' || sortValue !== ''

  const isSearchOnly = search.trim() !== '' && status === '' && favorites === '' && selectedCountry === 'All' && sortValue === ''

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

  if (sortValue) {
    activeFilters.push(sortLabelMap[sortValue])
  }

  if (favorites) {
    activeFilters.push('Только избранное')
  }

  function handleResetFilters() {
    const nextParams = new URLSearchParams()

    if (viewValue !== DEFAULT_VIEW) {
      nextParams.set('view', viewValue)
    }

    setSearchParams(nextParams)
    setSelectedCountry('All')
  }

  const loadPlaces = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchPlacesPage({
        search: search.trim(),
        status,
        sort: sortValue,
        page,
        perPage,
      })

      setData(result.data ?? [])
      setPages(result.pages ?? 0)
      setItems(result.items ?? 0)
    } catch {
      setError('Не удалось загрузить данные')
    } finally {
      setIsLoading(false)
    }
  }, [search, status, sortValue, page, perPage])

  useEffect(() => {
    loadPlaces()
  }, [loadPlaces])

  useEffect(() => {
    const candidatePage = Number(pageRaw)
    const isPageValid = Number.isInteger(candidatePage) && candidatePage > 0

    const candidatePerPage = Number(perPageRaw)
    const isPerPageValid = ALLOWED_PER_PAGE.includes(candidatePerPage)

    const shouldRemovePage = pageRaw !== '' && !isPageValid
    const shouldRemovePerPage = perPageRaw !== '' && !isPerPageValid

    if (!shouldRemovePage && !shouldRemovePerPage) {
      return
    }

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)

        if (shouldRemovePage) {
          next.delete('page')
        }

        if (shouldRemovePerPage) {
          next.delete('perPage')
        }

        return next
      },
      { replace: true }
    )
  }, [pageRaw, perPageRaw, setSearchParams])

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

    if (FILTER_KEYS_THAT_RESET_PAGE.includes(key)) {
      nextParams.delete('page')
    }

    setSearchParams(nextParams)
  }

  function goToPage(nextPage) {
    const nextParams = new URLSearchParams(searchParams)

    if (nextPage === DEFAULT_PAGE) {
      nextParams.delete('page')
    } else {
      nextParams.set('page', String(nextPage))
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

  const visiblePlaces = data
    .filter((place) => selectedCountry === 'All' || place.country === selectedCountry)
    .filter((place) => {
      if (!favorites) {
        return true
      }

      return wishlistIds.includes(place.id)
    })

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

        <div className="per-page-filter">
          <label htmlFor="per-page-select">На странице</label>
          <select
            id="per-page-select"
            value={perPage}
            onChange={(event) => updateParam('perPage', Number(event.target.value) === DEFAULT_PER_PAGE ? '' : event.target.value)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
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
        <div className="active-filters-section">
          <div className="active-filters">
            <strong>Активные фильтры:</strong> {activeFilters.join(', ')}
          </div>
          <button
            className="reset-filters-button"
            onClick={handleResetFilters}
          >
            Сбросить фильтры
          </button>
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
          ) : visiblePlaces.length === 0 ? (
            <div className="places-empty">
              {hasActiveFilters ? (
                <>
                  <p className="places-empty-title">Ничего не найдено по выбранным фильтрам</p>
                  {isSearchOnly && <p className="places-empty-hint">Поиск выполняется только по названию места.</p>}
                  <button
                    className="reset-filters-button"
                    onClick={handleResetFilters}
                  >
                    Сбросить фильтры
                  </button>
                </>
              ) : (
                <p className="places-empty-title">Список мест пока пуст.</p>
              )}
            </div>
          ) : viewValue === 'table' ? (
            <PlaceTable places={visiblePlaces} />
          ) : (
            <PlaceList
              places={visiblePlaces}
              searchQuery={search}
              onEdit={(place) => navigate(`/places/${place.id}/edit`)}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </Section>

        {!isLoading && !error && (
          <Pagination
            page={page}
            pages={pages}
            items={items}
            onPageChange={goToPage}
          />
        )}
      </main>
    </div>
  )
}
