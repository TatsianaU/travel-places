const MAX_RECENT = 5

export function recentPlacesReducer(state, action) {
  switch (action.type) {
    case 'viewed': {
      const id = action.id

      if (state[0] === id) {
        return state
      }

      const withoutId = state.filter((item) => item !== id)
      return [id, ...withoutId].slice(0, MAX_RECENT)
    }

    case 'cleared': {
      if (state.length === 0) {
        return state
      }
      return []
    }

    default: {
      throw new Error(`Неизвестный action: ${action.type}`)
    }
  }
}
