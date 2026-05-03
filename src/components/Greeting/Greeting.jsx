import './Greeting.css'

const Greeting = ({ name }) => {
  return (
    <div className="greeting-container">
      <p className="greeting-text">
        Привет, <span className="greeting-name">{name}</span>! Добро пожаловать в <span className="greeting-brand">Travel Places</span>
      </p>
    </div>
  )
}

export default Greeting
