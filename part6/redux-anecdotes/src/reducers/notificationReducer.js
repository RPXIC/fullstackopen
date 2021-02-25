const notificationReducer = (state = { text: '', sec: 0 }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (text, sec) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        text,
        sec,
      },
    })
    setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTIFICATION',
          data: {
            text: '',
            sec: 0,
          },
        }),
      sec * 1000
    )
  }
}

export default notificationReducer
