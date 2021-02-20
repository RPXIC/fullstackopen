import React from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, deleteBlog, updateBlog }) => {
  return (
    <>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </>
  )
}

export default BlogsList
