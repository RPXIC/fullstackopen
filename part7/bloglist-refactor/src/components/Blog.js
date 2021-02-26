import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const isOwner =
    blog.user.username ===
    JSON.parse(window.localStorage.getItem('user')).username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = blog => {
    const { title, author, url, likes, user, id } = blog
    const newBlog = { title, author, url, likes: likes + 1, user: user.id }
    updateBlog(newBlog, id)
  }

  const handleRemove = blog => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} data-cy='blog'>
      <div>
        <span>
          {blog.title} {blog.author}
        </span>
        <button
          data-cy='blog-details-button'
          onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <div>
            <span>
              Likes: <span data-cy='likes'>{blog.likes}</span>
            </span>
            <button data-cy='like-button' onClick={() => handleLike(blog)}>
              like
            </button>
          </div>
          <p>{blog.user.username}</p>
          {isOwner && (
            <button data-cy='remove-button' onClick={() => handleRemove(blog)}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}
export default Blog
