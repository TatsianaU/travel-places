import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { placeFormSchema } from './placeFormSchema'

describe('placeFormSchema', () => {
  it('Принимает корректные данные места', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const result = placeFormSchema.safeParse(validData)

    expect(result.success).toBe(true)
  })

  it('Отклоняет название короче двух символов', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const invalidData = {
      ...validData,
      title: 'А',
    }

    const result = placeFormSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors

      expect(fieldErrors.title).toBeDefined()
      expect(fieldErrors.title[0]).toContain('минимум 2 символа')
    }
  })

  it('Отклоняет год посещения раньше 1900 года', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const invalidData = {
      ...validData,
      status: 'visited',
      visitedYear: 1850,
    }

    const result = placeFormSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors

      expect(fieldErrors.visitedYear).toBeDefined()
      expect(fieldErrors.visitedYear[0]).toContain('Укажите год от 1900')
    }
  })

  it('Отклоняет год посещения позже текущего года', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const invalidData = {
      ...validData,
      status: 'visited',
      visitedYear: new Date().getFullYear() + 1,
    }

    const result = placeFormSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors

      expect(fieldErrors.visitedYear).toBeDefined()
      expect(fieldErrors.visitedYear[0]).toContain('Укажите год от 1900')
    }
  })

  it('Требует год для посещённых мест', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const invalidData = {
      ...validData,
      status: 'visited',
      visitedYear: undefined,
    }

    const result = placeFormSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors

      expect(fieldErrors.visitedYear).toBeDefined()
      expect(fieldErrors.visitedYear[0]).toContain('год обязателен')
    }
  })

  it('Принимает посещённое место с годом на границах диапазона: 1900 и текущий год', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const withMinYear = placeFormSchema.safeParse({
      ...validData,
      status: 'visited',
      visitedYear: 1900,
    })

    const withCurrentYear = placeFormSchema.safeParse({
      ...validData,
      status: 'visited',
      visitedYear: new Date().getFullYear(),
    })

    expect(withMinYear.success).toBe(true)
    expect(withCurrentYear.success).toBe(true)
  })

  it('Пустое поле года считается отсутствием года', () => {
    const validData = {
      title: 'Эйфелева башня',
      country: 'Франция',
      city: 'Париж',
      description: 'Знаменитая башня в центре Парижа',
      imageUrl: 'https://example.com/paris.jpg',
      status: 'planned',
      visitedYear: undefined,
    }

    const invalidData = {
      ...validData,
      status: 'visited',
      visitedYear: NaN,
    }

    const result = placeFormSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors

      expect(fieldErrors.visitedYear).toBeDefined()
      expect(fieldErrors.visitedYear[0]).toContain('год обязателен')
    }
  })
})
