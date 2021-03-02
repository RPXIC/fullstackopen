import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Blog } from 'components'

const BlogDetailsPage = () => {
  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(el => el.id === id)

  if (!blog) return null

  return <Blog blog={blog} />
}

export default BlogDetailsPage
