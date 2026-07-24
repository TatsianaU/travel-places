# ДЗ 14 · Задание 1 — Тема оформления

Учебный шаблон: что будем писать, зачем каждый файл и как части склеиваются.
Пока это **только план** — в `src/` код ещё не трогаем.

Проект на **JavaScript** (как на уроке у ментора), не TypeScript.
В ДЗ указаны `.ts` / `.tsx` — у нас те же роли файлов, но расширения `.js` / `.jsx`.

---

## Архитектура (картинка в голове)

```
main.jsx
  └─ ThemeProvider          ← хранит theme + toggleTheme, пишет data-theme и localStorage
       └─ App
            └─ Header
                 └─ ThemeToggle   ← useTheme() → читает контекст, без props
```

**Кто за что отвечает:**

| Слой | Файлы | Роль |
|------|--------|------|
| Feature (состояние) | `ThemeContext.js`, `ThemeProvider.jsx`, `useTheme.js` | глобальная тема |
| UI | `ThemeToggle.jsx` + CSS | кнопка Sun/Moon |
| Стили приложения | `index.css` (+ пара компонентов) | CSS-переменные и `data-theme` |
| Точка входа | `main.jsx` | обернуть дерево в `ThemeProvider` |

**Важно из ДЗ:** цвета меняет **браузер по CSS**, а не React через inline-стили.
React перерендеривает только тех, кто вызвал `useTheme()` (кнопка иконки).
Страница перекрашивается, потому что на `<html>` меняется `data-theme`, а CSS-переменные переключаются.

---

## Какие файлы появятся / изменятся

```
src/
  features/theme/
    ThemeContext.js      ← создать
    ThemeProvider.jsx    ← создать
    useTheme.js          ← создать
  components/ThemeToggle/
    ThemeToggle.jsx      ← создать
    ThemeToggle.css      ← создать
  components/Header/
    Header.jsx           ← вставить <ThemeToggle />
  index.css              ← :root + [data-theme='dark']
  main.jsx               ← обернуть в <ThemeProvider>
```

Минимум 3–4 CSS-переменных: фон, поверхность, текст, приглушённый текст, рамка.
Перевести хотя бы **два** места на `var(--color-...)` (например `body` / страница + карточки ленты или footer).

---

## 1. `src/features/theme/ThemeContext.js`

Контекст — «коробка» для значения. Само значение кладёт только Provider.

```jsx
import { createContext } from 'react'

// Подписи для UI (кнопка-переключатель, title)
export const THEME_LABEL = {
  light: 'светлая',
  dark: 'темная',
}

// Контейнер для данных и функций темы.
// null — не заглушка: так вызов useTheme вне провайдера даст понятную ошибку,
// а не «молча не работает».
export const ThemeContext = createContext(null)
```

---

## 2. `src/features/theme/ThemeProvider.jsx`

Единственное место, где живёт `useState` темы и побочные эффекты.

```jsx
import { useEffect, useState } from 'react'

import { ThemeContext } from './ThemeContext'

// Один ключ на чтение и запись — без опечаток в разных местах
const THEME_STORAGE_KEY = 'theme'

// Lazy init: вызывается React'ом один раз при первом рендере
function loadInitialTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  // Валидация: в localStorage может лежать мусор
  return stored === 'light' || stored === 'dark' ? stored : 'light'
}

export function ThemeProvider({ children }) {
  // Важно: useState(loadInitialTheme) — передаём функцию, НЕ вызываем сами
  const [theme, setTheme] = useState(loadInitialTheme)

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Побочные эффекты — только в useEffect
  // 1) data-theme на <html> — «рубильник» для CSS
  // 2) localStorage — чтобы тема переживала перезагрузку
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  // React 19: можно писать <ThemeContext value={...}> без .Provider
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
```

**Почему не reducer:** одно поле + одно действие — `useState` достаточно (так и написано в ДЗ).

---

## 3. `src/features/theme/useTheme.js`

Единственный способ читать тему из UI. Защита от использования вне провайдера.

```jsx
import { useContext } from 'react'

import { ThemeContext } from './ThemeContext'

export function useTheme() {
  // Читает значение ближайшего ThemeProvider выше по дереву
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme можно вызывать только внутри <ThemeProvider>')
  }

  return context
}
```

---

## 4. Подключение в `src/main.jsx`

`ThemeProvider` должен быть **выше** всего UI, которому нужна тема.
`BrowserRouter` оставляем как сейчас (`react-router-dom`).

```jsx
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { ThemeProvider } from './features/theme/ThemeProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Контекст темы доступен всему App и ниже */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
```

---

## 5. CSS-переменные в `src/index.css`

Светлая тема — в `:root`. Тёмная — переопределение через `[data-theme='dark']`.
Именно поэтому Provider пишет `document.documentElement.dataset.theme`.

```css
:root {
  --color-bg: #f5f6fa;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
}

[data-theme='dark'] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
}
```

Значения можно подогнать под текущий визуал проекта — главное, чтобы переменных было ≥ 3–4 и тёмная тема реально отличалась.

---

## 6. `src/components/ThemeToggle/ThemeToggle.jsx`

Без props: всё из `useTheme()`. Иконки из уже установленного `lucide-react`.

```jsx
import './ThemeToggle.css'

import { Moon, Sun } from 'lucide-react'

import { THEME_LABEL } from '../../features/theme/ThemeContext'
import { useTheme } from '../../features/theme/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'
  const label = isDark ? 'Включить светлую тему' : 'Включить темную тему'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={`${label} (сейчас ${THEME_LABEL[theme]})`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
```

---

## 7. `src/components/ThemeToggle/ThemeToggle.css`

Как у ментора: круглая кнопка в правом верхнем углу шапки (шапка у нас градиентная — белая иконка читается).

```css
.theme-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.28);
}
```

Чтобы `absolute` работал относительно шапки, у `.header` понадобится `position: relative` (мелкое изменение в `Header.css`).

---

## 8. Вставка кнопки в `Header.jsx`

```jsx
import './Header.css'

import React from 'react'
import { NavLink } from 'react-router-dom'

import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function Header() {
  return (
    <header className="header">
      <ThemeToggle />
      {/* ...остальной JSX шапки без изменений... */}
    </header>
  )
}
```

---

## 9. Перевести 2+ компонента на переменные

Примеры (конкретные селекторы уточним при написании кода):

**Карточка ленты** (`TravelFeed.css` или аналог):

```css
.travel-post-card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

**Приглушённый текст / метаданные:**

```css
.travel-post-meta {
  color: var(--color-text-muted);
}
```

Либо footer / фон страницы списка мест — любой второй «видимый» кусок, чтобы при переключении темы было заметно.

---

## Порядок реализации (когда перейдём к коду)

1. `ThemeContext.js` → `ThemeProvider.jsx` → `useTheme.js`
2. Обернуть `App` в `ThemeProvider` в `main.jsx`
3. CSS-переменные в `index.css` + `body`
4. `ThemeToggle` + вставить в `Header`
5. Перевести 2 компонента на `var(--color-...)`
6. Проверить: клик меняет тему, F5 сохраняет выбор, DevTools → `<html data-theme="...">`

---

## Чеклист соответствия ДЗ

- [ ] Context + `useState` (не reducer)
- [ ] Три файла: Context / Provider / `useTheme` с `throw`
- [ ] `:root` + `[data-theme='dark']`, ≥ 3–4 переменных
- [ ] `data-theme` и `localStorage` в одном `useEffect`
- [ ] Lazy init + валидация `'light' | 'dark'`
- [ ] Кнопка Sun/Moon без props через хук
- [ ] Хотя бы 2 компонента на CSS-переменных

### Опционально (третья тема) — пока не делаем

Круговое переключение `light → dark → green → light`, свой блок `[data-theme='green']`, расширенная валидация в `loadInitialTheme`.

---

## Ветка

Работаем в ветке: **`feat/theme-toggle`**.
`}
