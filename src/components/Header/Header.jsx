import './Header.css'

import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div>
          <h1 className="header-title">Travel Places</h1>
          <p className="header-subtitle">Откройте для себя удивительные места по всему миру</p>
        </div>

        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
          >
            Главная
          </NavLink>
          <NavLink
            to="/places"
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
          >
            Места
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
          >
            Избранное
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
          >
            О проекте
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
