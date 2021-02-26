import React, { useEffect, useState, useRef } from 'react'
import {
  Account,
  BlogForm,
  BlogsList,
  LoginForm,
  Message,
  Togglable,
} from 'components'
import { blogsService } from 'services'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [update, setUpdate] = useState(true)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (update) {
        const res = await blogsService.getAll()
        setBlogs(res)
        setUpdate(false)
      }
    })()
  }, [update])

  const createBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogsService.create(newBlog)
      setUpdate(true)
      setMessage({ type: 'success', text: `a new blog ${res.title} added` })
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlog = async (newBlog, id) => {
    try {
      const res = await blogsService.updateBlog(newBlog, id)
      setUpdate(true)
      setMessage({ type: 'success', text: `a new like ${res.title} added` })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async id => {
    try {
      await blogsService.deleteBlog(id)
      setUpdate(true)
      setMessage({ type: 'success', text: 'blog deleted' })
    } catch (error) {
      console.log(error)
    }
  }

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
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <BlogsList
            blogs={blogs}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        </>
      )}
    </div>
  )
}

export default App
