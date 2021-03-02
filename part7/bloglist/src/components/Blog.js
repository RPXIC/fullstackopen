import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeABlog } from 'reducers/blogReducer'
import { Comments } from 'components'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const isOwner =
    blog.user.username ===
    JSON.parse(window.localStorage.getItem('user')).username

  return (
    <div className='blogStyle'>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginTop: '.8rem' }}>
          Likes: <span data-cy='likes'>{blog.likes}</span>
        </p>
        <Button variant='success' onClick={() => dispatch(likeABlog(blog))}>
          like
        </Button>
      </div>
      <p>added by {blog.author}</p>
      {isOwner && (
        <Button variant='danger' onClick={() => dispatch(deleteBlog(blog))}>
          Remove
        </Button>
      )}
      <Comments blog={blog} />
    </div>
  )
}
export default Blog
