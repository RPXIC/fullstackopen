import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const NavBar = () => (
  <Navbar bg='primary' variant='dark'>
    <Nav className='mr-auto'>
      <Nav.Link href='#' as='span'>
        <Link className='link' to={'/home'} style={{ color: 'white' }}>
          Blogs
        </Link>
      </Nav.Link>
      <Nav.Link href='#' as='span'>
        <Link className='link' to={'/users'} style={{ color: 'white' }}>
          Users
        </Link>
      </Nav.Link>
    </Nav>
  </Navbar>
)

export default NavBar
