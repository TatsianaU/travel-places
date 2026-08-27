import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error: error instanceof Error ? error : new Error(String(error)) }
  }

  componentDidCatch(error, info) {
    console.error('Ошибка рендера:', error, info.componentStack)
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error) {
      return this.props.fallback({ error, reset: this.reset })
    }

    return this.props.children
  }
}

export default ErrorBoundary
