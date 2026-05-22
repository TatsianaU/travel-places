import './Clock.css'

import { useEffect, useState } from 'react'

function Clock() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
    <section className="clock-card">
      <span className="clock-label">Текущее время</span>
      <time
        className="clock-time"
        dateTime={date.toISOString()}
      >
        {date.toLocaleTimeString()}
      </time>
    </section>
  )
}

export default Clock
