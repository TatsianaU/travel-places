import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="home-page__box">
        <h1 className="home-page__title">Добро пожаловать в Travel Places</h1>
        <p className="home-page__text">
          Travel Places помогает хранить список мест, которые вы уже посетили, планируете посетить или мечтаете увидеть.
        </p>
        <Link
          className="home-page__button"
          to="/places"
        >
          Смотреть все места
        </Link>
      </div>
    </section>
  )
}
