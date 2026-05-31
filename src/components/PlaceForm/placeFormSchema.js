import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const placeFormSchema = z
  .object({
    title: z.string().trim().min(2, 'Название обязательно и должно содержать минимум 2 символа'),
    country: z.string().trim().min(2, 'Страна обязательна и должна содержать минимум 2 символа'),
    city: z
      .string()
      .trim()
      .optional()
      .refine((value) => value === undefined || value.length === 0 || value.length >= 2, {
        message: 'Если указан город, он должен содержать минимум 2 символа',
      }),
    description: z
      .string()
      .trim()
      .min(10, 'Описание обязательно и должно содержать минимум 10 символов')
      .max(300, 'Описание не должно быть длиннее 300 символов'),
    imageUrl: z
      .string()
      .trim()
      .min(1, 'Неверный URL изображения')
      .refine((value) => {
        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      }, 'Неверный URL изображения'),
    status: z.enum(['visited', 'wishlist', 'planned']),
    visitedYear: z.preprocess((value) => (typeof value === 'number' && Number.isNaN(value) ? undefined : value), z.number().optional()),
  })
  .refine((values) => values.status !== 'visited' || values.visitedYear !== undefined, {
    path: ['visitedYear'],
    message: 'Для посещённых мест год обязателен',
  })
  .refine((values) => values.visitedYear === undefined || (values.visitedYear >= 1900 && values.visitedYear <= currentYear), {
    path: ['visitedYear'],
    message: 'Укажите год от 1900 до текущего года',
  })
