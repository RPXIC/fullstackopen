import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeABlog } from 'reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
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

  return (
    <div style={blogStyle} data-cy='blog'>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: <span data-cy='likes'>{blog.likes}</span>
      </p>
      <button data-cy='like-button' onClick={() => dispatch(likeABlog(blog))}>
        like
      </button>
      <p>added by {blog.author}</p>
      {isOwner && (
        <button
          data-cy='remove-button'
          onClick={() => dispatch(deleteBlog(blog))}>
          Remove
        </button>
      )}
    </div>
  )
}
export default Blog
