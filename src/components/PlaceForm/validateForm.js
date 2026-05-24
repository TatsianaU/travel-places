function isValidUrl(value) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export default function validateForm(values) {
  const errors = {}

  if (!values.title || values.title.trim().length < 2) {
    errors.title = 'Название обязательно и должно содержать минимум 2 символа'
  }

  if (!values.country || values.country.trim().length < 2) {
    errors.country = 'Страна обязательна и должна содержать минимум 2 символа'
  }

  if (values.city && values.city.trim().length > 0 && values.city.trim().length < 2) {
    errors.city = 'Если указан город, он должен содержать минимум 2 символа'
  }

  if (!values.description || values.description.trim().length < 10) {
    errors.description = 'Описание обязательно и должно содержать минимум 10 символов'
  }

  if (values.description && values.description.trim().length > 300) {
    errors.description = 'Описание не должно быть длиннее 300 символов'
  }

  if (!values.imageUrl || !isValidUrl(values.imageUrl)) {
    errors.imageUrl = 'Неверный URL изображения'
  }

  return errors
}
