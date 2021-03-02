import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { blogsServices, loginService } from 'services'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user.data))
      setUser(user.data)
      blogsServices.setToken(user.data.token)
      dispatch(setNotification(`Welcome ${user.data.name}`, 3, 'success'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 3, 'warning'))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <span>Username </span>
        <input
          data-cy='username-input'
          type='text'
          placeholder='Username'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <span>Password </span>
        <input
          data-cy='password-input'
          type='password'
          placeholder='Password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-cy='login-button'>Login</button>
    </form>
  )
}

export default LoginForm
