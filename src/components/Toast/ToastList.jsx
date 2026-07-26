import './ToastList.css'

import { useToasts } from '../../features/toasts/useToasts'

export default function ToastList() {
  const { toasts, dismissToast } = useToasts()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div
      className="toast-list"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast"
          role="status"
        >
          <p className="toast__message">{toast.message}</p>
          <button
            type="button"
            className="toast__close"
            aria-label="Закрыть уведомление"
            onClick={() => dismissToast(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
