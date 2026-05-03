import './Section.css'

export default function Section({ title, children }) {
  return (
    <section className="custom-section">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  )
}
