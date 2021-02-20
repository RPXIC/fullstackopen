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
            type='text'
            name='title'
            onChange={handleChange}
            value={title}
          />
        </div>
        <div>
          <span>Author: </span>
          <input
            type='text'
            name='author'
            onChange={handleChange}
            value={author}
          />
        </div>
        <div>
          <span>Url: </span>
          <input type='text' name='url' onChange={handleChange} value={url} />
        </div>
        <button>Create</button>
      </form>
    </>
  )
}

export default BlogForm
