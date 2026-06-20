import { API_URL } from '../config'

const PLACES_URL = `${API_URL}/places`

export async function fetchPlaces() {
  const response = await fetch(PLACES_URL)

  if (!response.ok) {
    throw new Error('Не удалось загрузить данные')
  }

  return response.json()
}

export async function fetchPlacesPage({ search, status, sort, page, perPage }) {
  const params = new URLSearchParams()

  if (search) {
    params.set('title:contains', search)
  }

  if (status) {
    params.set('status', status)
  }

  if (sort) {
    params.set('_sort', sort)
  }

  if (page) {
    params.set('_page', page)
  }

  if (perPage) {
    params.set('_per_page', perPage)
  }

  const response = await fetch(`${PLACES_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить данные')
  }

  const result = await response.json()

  return {
    data: result.data,
    pages: result.pages,
    items: result.items,
  }
}

export async function fetchPlace(id) {
  const response = await fetch(`${PLACES_URL}/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Не удалось загрузить место')
  }

  return response.json()
}

export async function createPlace(place) {
  const response = await fetch(PLACES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(place),
  })

  if (!response.ok) {
    throw new Error('Не удалось добавить место')
  }

  return response.json()
}

export async function updatePlace(id, updatedPlace) {
  const response = await fetch(`${PLACES_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPlace),
  })

  if (!response.ok) {
    throw new Error('Не удалось обновить место')
  }

  return response.json()
}

export async function deletePlace(id) {
  const response = await fetch(`${PLACES_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Не удалось удалить место')
  }
}
