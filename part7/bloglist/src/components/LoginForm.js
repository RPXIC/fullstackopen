import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from 'reducers/userReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async e => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group
        style={{ display: 'flex', alignItems: 'center', margin: '.5rem ' }}>
        <Form.Control
          type='text'
          value={username}
          name='username'
          placeholder='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Control
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant='primary' type='submit'>
          login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
