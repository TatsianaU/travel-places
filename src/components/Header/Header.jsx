import './Header.css'

import React from 'react'

// Пример без JSX. JSX -> вызов метода createElement
// export default function Header() {
//   return React.createElement(
//     'header',
//     { className: 'header' },
//     React.createElement('h1', { className: 'header-title' }, 'Travel Places'),
//     React.createElement('p', { className: 'header-subtitle' }, 'Откройте для себя удивительные места по всему миру')
//   )
// }

// Вариант 1
export default function Header() {
  return (
    <header
      className="header"
      // style={{ color: 'red' }}
    >
      <h1 className="header-title">Travel Places</h1>
      <p className="header-subtitle">Откройте для себя удивительные места по всему миру</p>
    </header>
  )
}

// Вариант 2
// export default Header
