import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from 'reducers/blogReducer'
import { setUser } from 'reducers/userReducer'
import { BlogForm, Togglable, BlogsList } from 'components'
import '../App.css'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUser())
    dispatch(getBlogs())
  }, [])

  return (
    <>
      <h3>Blogs</h3>
      {user !== null && (
        <>
          <Togglable buttonLabel='Create new' element='form'>
            <BlogForm />
          </Togglable>
          <BlogsList />
        </>
      )}
    </>
  )
}

export default Home
