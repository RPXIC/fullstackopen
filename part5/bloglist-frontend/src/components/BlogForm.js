import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const { title, author, url } = newBlog

  const handleNewBlog = async e => {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
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
      <form onSubmit={handleNewBlog}>
        <div>
          <span>Title: </span>
          <input
            data-cy='title-input'
            type='text'
            name='title'
            onChange={handleChange}
            value={title}
            className='title'
          />
        </div>
        <div>
          <span>Author: </span>
          <input
            data-cy='author-input'
            type='text'
            name='author'
            onChange={handleChange}
            value={author}
            className='author'
          />
        </div>
        <div>
          <span>Url: </span>
          <input
            data-cy='url-input'
            type='text'
            name='url'
            onChange={handleChange}
            value={url}
            className='url'
          />
        </div>
        <button data-cy='create-button'>Create</button>
      </form>
    </>
  )
}

export default BlogForm
