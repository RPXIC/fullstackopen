const isVisibleReducer = (state = { form: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_VISIBLE': {
      const element = action.element
      let newState = {
        ...state,
      }
      newState[element] = !newState[element]
      return newState
    }
    default:
      return state
  }
}

export const toggleIsVisible = el => {
  return async dispatch => {
    dispatch({
      type: 'TOGGLE_VISIBLE',
      element: el,
    })
  }
}

export default isVisibleReducer
