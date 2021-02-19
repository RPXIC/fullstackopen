import { useState } from 'react'
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
          type='password'
          placeholder='Password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  )
}

export default LoginForm
