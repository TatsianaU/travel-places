import { useEffect, useState } from 'react'

import './MousePosition.css'

export default function MousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    function handleMouseMove(event) {
      console.log('mousemove active')
      setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      console.log('cleanup mousemove')
    }
  }, [])

  return (
    <section className="mouse-position-card">
      <h2 className="mouse-position-title">Mouse Position</h2>
      <p className="mouse-position-value">
        X: {position.x}, Y: {position.y}
      </p>
    </section>
  )
}
