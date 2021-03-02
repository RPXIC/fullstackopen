import { setNotification } from '../reducers/notificationReducer'
import { blogsServices, loginService } from 'services'

const usersReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data

    case 'LOGOUT':
      return action.data

    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    if (username.trim() !== '' && password.trim() !== '') {
      try {
        const user = await loginService({ username, password })
        window.localStorage.setItem('user', JSON.stringify(user.data))
        dispatch({
          type: 'LOGIN',
          data: user.data,
        })
        blogsServices.setToken(user.data.token)
        dispatch(setNotification(`Welcome ${user.data.name}`, 3, 'success'))
      } catch (error) {
        dispatch(setNotification(error.response.data.error, 3, 'warning'))
      }
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      window.localStorage.clear()
      blogsServices.setToken(null)
      dispatch({
        type: 'LOGOUT',
        data: null,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const setUser = () => {
  return async dispatch => {
    try {
      const loggedUserJSON = window.localStorage.getItem('user')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogsServices.setToken(user.token)
        dispatch({
          type: 'LOGIN',
          data: user,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default usersReducer
