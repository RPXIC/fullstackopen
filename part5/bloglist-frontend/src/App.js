import React, { useEffect, useState } from 'react'
import { Account, BlogForm, BlogsList, LoginForm, Message } from 'components'
import { blogsService } from 'services'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await blogsService.getAll()
      setBlogs(res)
    })()
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {message && <Message message={message} setMessage={setMessage} />}
      {user === null ? (
        <>
          <LoginForm setUser={setUser} setMessage={setMessage} />
        </>
      ) : (
        <>
          <Account user={user} setUser={setUser} />
          <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
          <BlogsList blogs={blogs} />
        </>
      )}
    </div>
  )
}

export default App
