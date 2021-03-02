import React, { useState } from 'react'
import { createBlog } from 'reducers/blogReducer'
import { toggleIsVisible } from 'reducers/isVisibleReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const { title, author, url } = newBlog
  const dispatch = useDispatch()

  const handleNewBlog = async e => {
    e.preventDefault()
    dispatch(createBlog(newBlog))
    setNewBlog({ title: '', author: '', url: '' })
    dispatch(toggleIsVisible('form'))
  }

  const handleChange = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <h2>Create new</h2>
      <Form onSubmit={handleNewBlog}>
        <div>
          <input
            placeholder='Title'
            type='text'
            name='title'
            onChange={handleChange}
            value={title}
            className='title'
          />
        </div>
        <div>
          <input
            placeholder='Author'
            type='text'
            name='author'
            onChange={handleChange}
            value={author}
            className='author'
          />
        </div>
        <div>
          <input
            placeholder='URL'
            type='text'
            name='url'
            onChange={handleChange}
            value={url}
            className='url'
          />
        </div>
        <Button variant='success' type='submit'>
          Create
        </Button>
      </Form>
    </>
  )
}

export default BlogForm
