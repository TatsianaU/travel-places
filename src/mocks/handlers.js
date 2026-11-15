import { http, HttpResponse } from 'msw'

import { API_URL } from '../config'

export function makePlace(overrides = {}) {
  return {
    id: 'place-1',
    title: 'Тестовое место',
    country: 'Россия',
    city: '',
    description: 'Описание тестового места',
    imageUrl: 'https://example.com/place.jpg',
    status: 'planned',
    visitedYear: null,
    ...overrides,
  }
}

export const defaultPlaces = [
  makePlace({ id: '1', title: 'Байкал', country: 'Россия' }),
  makePlace({ id: '2', title: 'Прага', country: 'Чехия', city: 'Прага' }),
  makePlace({ id: '3', title: 'Киото', country: 'Япония', city: 'Киото' }),
]

let places = defaultPlaces.map((place) => ({ ...place }))

export function resetPlaces() {
  places = defaultPlaces.map((place) => ({ ...place }))
}

export function makePlacesPage({ page = 1, perPage = 10 } = {}) {
  const start = (page - 1) * perPage

  return {
    data: places.slice(start, start + perPage),
    items: places.length,
    pages: Math.ceil(places.length / perPage),
  }
}

export const handlers = [
  http.get(`${API_URL}/places`, ({ request }) => {
    const { searchParams } = new URL(request.url)

    if (!searchParams.has('_page')) {
      return HttpResponse.json(places)
    }

    const page = Math.max(1, Number.parseInt(searchParams.get('_page'), 10) || 1)
    const perPage = Math.max(1, Number.parseInt(searchParams.get('_per_page'), 10) || 10)

    return HttpResponse.json(makePlacesPage({ page, perPage }))
  }),
]
