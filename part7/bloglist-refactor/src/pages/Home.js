import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBlogs } from 'reducers/blogReducer'
import {
  Account,
  BlogForm,
  LoginForm,
  Notification,
  Togglable,
  BlogsList,
} from 'components'
import { blogsServices } from 'services'
import '../App.css'

const Home = () => {
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsServices.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (update) {
        dispatch(getBlogs())
        setUpdate(false)
      }
    })()
  }, [update])

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <>
          <LoginForm setUser={setUser} />
        </>
      ) : (
        <>
          <Account user={user} setUser={setUser} />
          <Togglable buttonLabel='new blog' element='form'>
            <BlogForm />
          </Togglable>
          <BlogsList />
        </>
      )}
    </>
  )
}

export default Home
