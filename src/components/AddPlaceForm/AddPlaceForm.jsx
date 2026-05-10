import './AddPlaceForm.css'

import { useState } from 'react'

export default function AddPlaceForm({ onAddPlace }) {
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')

  // Состояние загрузки
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (title.trim() === '' || country.trim() === '') {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newPlace = {
      id: Date.now(),
      title: title.trim(),
      country: country.trim(),
      description: `Откройте для себя место ${title.trim()} в стране ${country.trim()}`,
      imageUrl: 'https://picsum.photos/400/300',
    }

    onAddPlace(newPlace)

    setTitle('')
    setCountry('')

    setIsSubmitting(false)
  }

  return (
    <form
      className="add-place-form"
      onSubmit={handleSubmit}
    >
      <div className="add-place-form-fields">
        <input
          className="add-place-form-input"
          type="text"
          placeholder="Название места"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          className="add-place-form-input"
          type="text"
          placeholder="Страна"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />

        <button
          className="add-place-form-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Добавление...' : 'Добавить'}
        </button>
      </div>
    </form>
  )
}
