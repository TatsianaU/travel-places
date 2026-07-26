export function toastReducer(state, action) {
  switch (action.type) {
    case 'added': {
      return [...state, action.toast]
    }

    case 'removed': {
      if (!state.some((toast) => toast.id === action.id)) {
        return state
      }

      return state.filter((toast) => toast.id !== action.id)
    }

    default: {
      throw new Error(`Неизвестный action: ${action.type}`)
    }
  }
}
