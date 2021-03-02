import React from 'react'
import { useSelector } from 'react-redux'
import { NavBar, LoginForm, Account } from 'components'

const Header = () => {
  const user = useSelector(state => state.user)

  return (
    <header className='header'>
      <NavBar />
      {user === null ? <LoginForm /> : <Account user={user} />}
    </header>
  )
}

export default Header
