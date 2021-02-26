import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { blogsService, loginService } from 'services'

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user.data))
      setUser(user.data)
      blogsService.setToken(user.data.token)
    } catch (error) {
      setMessage({ type: 'warning', text: error.response.data.error })
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default LoginForm
