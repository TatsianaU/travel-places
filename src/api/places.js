import { API_URL } from '../config'

const PLACES_URL = `${API_URL}/places`

export async function fetchPlaces() {
  const response = await fetch(PLACES_URL)

  if (!response.ok) {
    throw new Error('Не удалось загрузить данные')
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

export async function deletePlace(id) {
  const response = await fetch(`${PLACES_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Не удалось удалить место')
  }
}
