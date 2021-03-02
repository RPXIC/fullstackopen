import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetail = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserDetail
