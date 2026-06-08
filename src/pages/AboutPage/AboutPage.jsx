import './AboutPage.css'

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-page__box">
        <h1 className="about-page__title">О проекте</h1>
        <p className="about-page__text">
          Travel Places помогает хранить список мест, которые пользователь уже посетил, планирует посетить или мечтает увидеть.
        </p>
        <p className="about-page__text">Приложение создано для изучения React, React Hook Form, Zod и React Router.</p>
      </div>
    </section>
  )
}
