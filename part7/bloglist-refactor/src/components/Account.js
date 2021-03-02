import React from 'react'
import { blogsServices } from 'services'

const Account = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.clear()
    blogsServices.setToken(null)
    setUser(null)
  }

  return (
    <p>
      {user.name}
      <button data-cy='logout-button' onClick={handleLogout}>
        Logout
      </button>
    </p>
  )
}

export default Account
