import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      {blogs.map(blog => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </>
  )
}

export default BlogsList
