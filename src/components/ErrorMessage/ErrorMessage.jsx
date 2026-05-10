import './ErrorMessage.css'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p className="error-message-text">{message}</p>

      <button
        className="error-message-button"
        onClick={onRetry}
      >
        Попробовать снова
      </button>
    </div>
  )
}
