const notificationReducer = (
  state = { text: '', sec: 0, type: '' },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let timeoutID

export const setNotification = (text, sec, type) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        text,
        sec,
        type,
      },
    })

    timeoutID && clearTimeout(timeoutID)

    timeoutID = setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTIFICATION',
          data: {
            text: '',
            sec: 0,
            type: '',
          },
        }),
      sec * 1000
    )
  }
}

export default notificationReducer
