import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest'

import { resetPlaces } from '../mocks/handlers'
import { server } from '../mocks/node'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

beforeEach(() => {
  resetPlaces()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
