import { API_URL } from '../config'

export async function getTravelPostsPage({ page, perPage }) {
  const query = new URLSearchParams()
  query.set('_page', String(page))
  query.set('_per_page', String(perPage))
  query.set('_sort', '-createdAt')

  const response = await fetch(`${API_URL}/travelPosts?${query.toString()}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить ленту')
  }

  return response.json()
}

export async function getManyTravelPosts({ limit }) {
  const query = new URLSearchParams()
  query.set('_page', '1')
  query.set('_per_page', String(limit))
  query.set('_sort', '-createdAt')

  const response = await fetch(`${API_URL}/travelPosts?${query.toString()}`)

  if (!response.ok) {
    throw new Error('Не удалось загрузить ленту')
  }

  const payload = await response.json()
  return payload.data
}
