import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  const handleSubmit = e => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: '1rem .3rem',
      }}>
      <input
        name='username'
        placeholder='Username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <input
        name='password'
        placeholder='Password'
        value={password}
        type='password'
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button>login</button>
    </form>
  )
}

export default Login
