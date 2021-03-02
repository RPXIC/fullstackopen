import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <div>
    <Link className='link' to={'/home'}>
      Blogs
    </Link>
    <Link className='link' to={'/users'}>
      Users
    </Link>
  </div>
)

export default NavBar
