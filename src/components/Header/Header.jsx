import './Header.css'

import React from 'react'
import { NavLink } from 'react-router-dom'

import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Header({ onPreloadLargeFeed }) {
  return (
    <header className="header">
      <ThemeToggle />
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
            end
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
          >
            Места
          </NavLink>
          {/*
            Большую ленту загружаем заранее: это тяжёлая страница,
            а наведение показывает, что пользователь, вероятно, хочет её открыть.

            Для лёгких и редко посещаемых страниц предзагрузка не нужна:
            их код может загрузиться зря и потратить трафик.

            На мобильных устройствах наведения нет, поэтому при переходе
            загрузку страницы по-прежнему показывает PageSkeleton.
          */}
          <NavLink
            to="/places/feed"
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
            onMouseEnter={onPreloadLargeFeed}
          >
            Большая лента
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
