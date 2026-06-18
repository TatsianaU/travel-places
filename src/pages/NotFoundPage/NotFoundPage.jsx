import './NotFoundPage.css'

import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-page__box">
        <h1 className="not-found-page__status">404</h1>
        <p className="not-found-page__title">Такой страницы не существует.</p>
        <p className="not-found-page__description">Возможно, вы ошиблись в адресе.</p>
        <div className="not-found-page__links">
          <Link
            className="not-found-page__link"
            to="/"
          >
            На главную
          </Link>
          <Link
            className="not-found-page__link"
            to="/places"
          >
            К списку мест
          </Link>
        </div>
      </div>
    </section>
  )
}
