import './ErrorFallback.css'

import { RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ErrorFallback({ error, onRetry, what = 'этот блок' }) {
  return (
    <div
      className="error-fallback"
      role="alert"
    >
      <h2 className="error-fallback-title">Что-то пошло не так</h2>
      <p className="error-fallback-message">Не удалось отобразить {what}. Это ошибка приложения, а не ваших действий.</p>

      {import.meta.env.DEV && <pre className="error-fallback-details">{error.message}</pre>}

      <div className="error-fallback-actions">
        <button
          type="button"
          className="error-fallback-button"
          onClick={onRetry}
        >
          <RotateCcw size={16} />
          Попробовать снова
        </button>

        <Link
          to="/"
          className="error-fallback-link"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
