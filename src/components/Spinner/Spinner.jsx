import './Spinner.css'

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />

      <p className="spinner-text">Загрузка...</p>
    </div>
  )
}
