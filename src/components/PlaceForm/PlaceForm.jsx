import './PlaceForm.css'

import { useState } from 'react'

import validateForm from './validateForm'

export const INITIAL_FORM_DATA = {
  title: '',
  country: '',
  city: '',
  description: '',
  imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
}

export default function PlaceForm({ onAddPlace }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSubmitting) return

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const newPlace = {
        ...formData,
        city: formData.city.trim(),
      }

      await onAddPlace(newPlace)

      setFormData(INITIAL_FORM_DATA)
    } catch (err) {
      setSubmitError(err.message ?? 'Ошибка при отправке')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleResetForm() {
    if (isSubmitting) return

    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    setSubmitError(null)
  }

  const descriptionLength = formData.description.length
  const remainingCharacters = 300 - descriptionLength
  const isLimitExceeded = remainingCharacters < 0
  const counterText = isLimitExceeded ? `Превышен лимит на ${Math.abs(remainingCharacters)} символов` : `Осталось ${remainingCharacters} символов`
  const counterClass = isLimitExceeded ? 'place-form-counter place-form-counter--error' : 'place-form-counter'

  return (
    <div className="place-form">
      <div className="place-form-card">
        <form
          className="place-form-grid"
          onSubmit={handleSubmit}
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
              name="title"
              className="place-form-input"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="place-form-error">{errors.title}</div>}
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
              name="country"
              className="place-form-input"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <div className="place-form-error">{errors.country}</div>}
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
              name="city"
              className="place-form-input"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <div className="place-form-error">{errors.city}</div>}
          </div>

          <div className="place-form-field place-form-field-full">
            <label
              className="place-form-label"
              htmlFor="place-description"
            >
              Описание
            </label>
            <textarea
              id="place-description"
              name="description"
              className="place-form-input"
              value={formData.description}
              onChange={handleChange}
            />
            <div className={counterClass}>{counterText}</div>
            {errors.description && <div className="place-form-error">{errors.description}</div>}
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
              name="imageUrl"
              className="place-form-input"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && <div className="place-form-error">{errors.imageUrl}</div>}
          </div>

          <div className="place-form-field place-form-field--full place-form-actions">
            <button
              className="place-form-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Добавление...' : 'Добавить'}
            </button>
            <button
              className="place-form-button place-form-button--secondary"
              type="button"
              disabled={isSubmitting}
              onClick={handleResetForm}
            >
              Очистить
            </button>
          </div>
          {submitError && <div className="place-form-error place-form-submit-error">{submitError}</div>}
        </form>
      </div>
    </div>
  )
}
