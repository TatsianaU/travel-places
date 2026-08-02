export function favoritesReducer(state, action) {
  switch (action.type) {
    case 'added': {
      if (state.includes(action.id)) {
        return state
      }

      return [...state, action.id]
    }

    case 'removed': {
      if (!state.includes(action.id)) {
        return state
      }

      return state.filter((id) => id !== action.id)
    }

    case 'toggled': {
      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id)
      }

      return [...state, action.id]
    }

    case 'cleared': {
      if (state.length === 0) {
        return state
      }

      return []
    }

    default: {
      throw new Error(`Неизвестное действие: ${action.type}`)
    }
  }
}
