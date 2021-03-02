import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from 'reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(commentBlog(blog, e.target.comment.value))
  }

  return (
    <>
      <h3>comments</h3>
      <Form onSubmit={handleSubmit}>
        <input name='comment' placeholder='comment...' />
        <Button variant='success' type='submit'>
          add comment
        </Button>
      </Form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments
