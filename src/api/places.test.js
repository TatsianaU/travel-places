import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { API_URL } from '../config'
import { server } from '../mocks/node.js'
import { fetchPlacesPage } from './places.js'

describe('fetchPlacesPage', () => {
  it('возвращает количество мест и страниц', async () => {
    await expect(fetchPlacesPage({ page: 1, perPage: 2 })).resolves.toMatchObject({
      items: 3,
      pages: 2,
    })
  })

  it('выбрасывает ошибку при ответе HTTP 500', async () => {
    server.use(
      http.get(`${API_URL}/places`, () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    await expect(fetchPlacesPage({ page: 1, perPage: 2 })).rejects.toThrow('Не удалось загрузить данные')
  })
})
