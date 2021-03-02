import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <ListGroup>
      {blogs.map(blog => (
        <ListGroup.Item action variant='info' key={blog.id} as={'div'}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default BlogsList
