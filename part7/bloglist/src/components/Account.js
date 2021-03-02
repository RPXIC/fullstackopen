import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from 'reducers/userReducer'
import { Button } from 'react-bootstrap'

const Account = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <p style={{ margin: '.5rem' }}>
      {user.name} logged in
      <Button variant='danger' onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </p>
  )
}

export default Account
