import './ClickCounter.css'

import { useState } from 'react'

export default function ClickCounter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div className="counter">
      <h2 className="counter-title">Click Counter</h2>

      <p className="counter-value">Counter: {count}</p>

      <div className="counter-buttons">
        <button onClick={increment}>Click me</button>

        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
