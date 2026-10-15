// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import App from '../../App'
import { ThemeProvider } from '../../features/theme/ThemeProvider'
import ErrorBoundary from './ErrorBoundary'
import ErrorFallback from './ErrorFallback'

vi.mock('../../pages/AboutPage/AboutPage', () => ({
  default: function AboutPageBoom() {
    throw new Error('Тестовая ошибка страницы About')
  },
}))

vi.mock('../../pages/HomePage/HomePage', () => ({
  default: function HomePageStub() {
    return <div>Главная страница для теста</div>
  },
}))

vi.mock('../CompareBar/CompareBar', () => ({
  default: function CompareBarStub() {
    return null
  },
}))

function Boom({ shouldThrow, children = 'Рабочий экран' }) {
  if (shouldThrow) {
    throw new Error('Тестовая ошибка рендера')
  }

  return <div>{children}</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    console.error.mockRestore()
  })

  it('при ошибке рендера показывает ErrorFallback вместо сломанного экрана', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback
              error={error}
              onRetry={reset}
              what="этот блок"
            />
          )}
        >
          <Boom shouldThrow>Сломанный экран</Boom>
        </ErrorBoundary>
      </MemoryRouter>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument()
    expect(screen.getByText(/Не удалось отобразить этот блок/)).toBeInTheDocument()
    expect(screen.queryByText('Сломанный экран')).not.toBeInTheDocument()
  })

  it('обычный rerender с исправленным дочерним компонентом не сбрасывает сохранённую ошибку', () => {
    const fallback = ({ error, reset }) => (
      <ErrorFallback
        error={error}
        onRetry={reset}
        what="этот блок"
      />
    )

    const { rerender } = render(
      <MemoryRouter>
        <ErrorBoundary fallback={fallback}>
          <Boom shouldThrow>Сломанный экран</Boom>
        </ErrorBoundary>
      </MemoryRouter>
    )

    rerender(
      <MemoryRouter>
        <ErrorBoundary fallback={fallback}>
          <Boom shouldThrow={false}>Рабочий экран</Boom>
        </ErrorBoundary>
      </MemoryRouter>
    )

    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument()
    expect(screen.queryByText('Рабочий экран')).not.toBeInTheDocument()
  })

  it('кнопка «Попробовать снова» восстанавливает исправленный дочерний компонент', async () => {
    const user = userEvent.setup()

    const fallback = ({ error, reset }) => (
      <ErrorFallback
        error={error}
        onRetry={reset}
        what="этот блок"
      />
    )

    const { rerender } = render(
      <MemoryRouter>
        <ErrorBoundary fallback={fallback}>
          <Boom shouldThrow>Сломанный экран</Boom>
        </ErrorBoundary>
      </MemoryRouter>
    )

    rerender(
      <MemoryRouter>
        <ErrorBoundary fallback={fallback}>
          <Boom shouldThrow={false}>Рабочий экран</Boom>
        </ErrorBoundary>
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: 'Попробовать снова' }))

    expect(screen.getByText('Рабочий экран')).toBeInTheDocument()
    expect(screen.queryByText('Что-то пошло не так')).not.toBeInTheDocument()
  })

  it('смена маршрута восстанавливает экран через key={location.pathname} в App', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/about']}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument()
    expect(screen.getByText(/Не удалось отобразить эту страницу/)).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Главная' }))

    expect(screen.queryByText('Что-то пошло не так')).not.toBeInTheDocument()
    expect(screen.getByText('Главная страница для теста')).toBeInTheDocument()
  })
})
