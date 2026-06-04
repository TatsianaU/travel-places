import './PlaceForm.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { placeFormSchema } from './placeFormSchema'

const INITIAL_FORM_DATA = {
  title: '',
  country: '',
  city: '',
  description: '',
  imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
  status: 'planned',
  visitedYear: undefined,
}

export default function PlaceForm({ onAddPlace, placeToEdit, onUpdatePlace, onCancelEdit }) {
  const [submitError, setSubmitError] = useState(null)
  const isEditing = placeToEdit !== undefined

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(placeFormSchema),
    defaultValues: placeToEdit ?? INITIAL_FORM_DATA,
  })

  useEffect(() => {
    if (!placeToEdit) return

    reset({
      title: placeToEdit.title,
      country: placeToEdit.country,
      city: placeToEdit.city ?? '',
      description: placeToEdit.description,
      imageUrl: placeToEdit.imageUrl,
      status: placeToEdit.status,
      visitedYear: placeToEdit.visitedYear,
    })
  }, [placeToEdit, reset])

  const descriptionValue = useWatch({ control, name: 'description' }) ?? ''
  const statusValue = useWatch({
    control,
    name: 'status',
  })

  async function onSubmit(formData) {
    setSubmitError(null)

    try {
      const newPlace = {
        ...formData,
        city: formData.city.trim(),
      }

      if (isEditing) {
        await onUpdatePlace(placeToEdit.id, newPlace)

        onCancelEdit()

        reset(INITIAL_FORM_DATA)
      } else {
        await onAddPlace(newPlace)

        reset(INITIAL_FORM_DATA)
      }
    } catch (err) {
      setSubmitError(err.message ?? 'Ошибка при отправке')
    }
  }

  function handleResetForm() {
    if (isSubmitting) return

    reset(INITIAL_FORM_DATA)
    setSubmitError(null)
  }

  const descriptionLength = descriptionValue.length
  const remainingCharacters = 300 - descriptionLength
  const isLimitExceeded = remainingCharacters < 0
  const counterText = isLimitExceeded ? `Превышен лимит на ${Math.abs(remainingCharacters)} символов` : `Осталось ${remainingCharacters} символов`
  const counterClass = isLimitExceeded ? 'place-form-counter place-form-counter--error' : 'place-form-counter'

  return (
    <div className="place-form">
      <div className="place-form-card">
        <h2 className="place-form-title">{isEditing ? 'Редактировать место' : 'Добавить новое место'}</h2>
        <form
          className="place-form-grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="place-form-field">
            <label
              className="place-form-label"
              htmlFor="place-title"
            >
              Название
            </label>
            <input
              id="place-title"
              className="place-form-input"
              {...register('title')}
            />
            {errors.title && <div className="place-form-error">{errors.title.message}</div>}
          </div>

          <div className="place-form-field">
            <label
              className="place-form-label"
              htmlFor="place-country"
            >
              Страна
            </label>
            <input
              id="place-country"
              className="place-form-input"
              {...register('country')}
            />
            {errors.country && <div className="place-form-error">{errors.country.message}</div>}
          </div>

          <div className="place-form-field">
            <label
              className="place-form-label"
              htmlFor="place-city"
            >
              Город
            </label>
            <input
              id="place-city"
              className="place-form-input"
              {...register('city')}
            />
            {errors.city && <div className="place-form-error">{errors.city.message}</div>}
          </div>

          <div className="place-form-field">
            <label
              className="place-form-label"
              htmlFor="place-status"
            >
              Статус
            </label>
            <select
              id="place-status"
              className="place-form-input"
              {...register('status')}
            >
              <option value="visited">Посещено</option>
              <option value="wishlist">В список желаний</option>
              <option value="planned">Планируется</option>
            </select>
            {errors.status && <div className="place-form-error">{errors.status.message}</div>}
          </div>

          {statusValue === 'visited' && (
            <div className="place-form-field">
              <label
                className="place-form-label"
                htmlFor="place-visited-year"
              >
                Год посещения
              </label>
              <input
                id="place-visited-year"
                type="number"
                className="place-form-input"
                {...register('visitedYear', { valueAsNumber: true })}
              />
              {errors.visitedYear && <div className="place-form-error">{errors.visitedYear.message}</div>}
            </div>
          )}

          <div className="place-form-field place-form-field-full">
            <label
              className="place-form-label"
              htmlFor="place-description"
            >
              Описание
            </label>
            <textarea
              id="place-description"
              className="place-form-textarea"
              {...register('description')}
            />
            <div className={counterClass}>{counterText}</div>
            {errors.description && <div className="place-form-error">{errors.description.message}</div>}
          </div>

          <div className="place-form-field place-form-field--full">
            <label
              className="place-form-label"
              htmlFor="place-image"
            >
              Ссылка на изображение
            </label>
            <input
              id="place-image"
              className="place-form-input"
              {...register('imageUrl')}
            />
            {errors.imageUrl && <div className="place-form-error">{errors.imageUrl.message}</div>}
          </div>

          <div className="place-form-field place-form-field--full place-form-actions">
            <button
              className="place-form-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (isEditing ? 'Сохранение...' : 'Добавление...') : isEditing ? 'Сохранить' : 'Добавить'}
            </button>
            {isEditing && (
              <button
                className="place-form-button place-form-button--secondary"
                type="button"
                onClick={() => {
                  onCancelEdit()
                  reset(INITIAL_FORM_DATA)
                }}
              >
                Отмена
              </button>
            )}

            {!isEditing && (
              <button
                className="place-form-button place-form-button--secondary"
                type="button"
                disabled={isSubmitting}
                onClick={handleResetForm}
              >
                Очистить
              </button>
            )}
          </div>
          {submitError && <div className="place-form-error place-form-submit-error">{submitError}</div>}
        </form>
      </div>
    </div>
  )
}
