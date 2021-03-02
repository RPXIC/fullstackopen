import { usersService } from 'services'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data

    default:
      return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}

export default usersReducer
