const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return action.text
    default:
      return state
  }
}

export const addNotification = text => {
  return {
    type: 'SET_TEXT',
    text,
  }
}

export default notificationReducer
