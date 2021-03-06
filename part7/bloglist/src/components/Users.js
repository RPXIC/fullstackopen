import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from 'reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <>
      <h3>Users</h3>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users
