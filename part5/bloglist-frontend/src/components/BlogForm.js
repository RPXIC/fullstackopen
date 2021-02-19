import { useState } from 'react'
import { blogsService } from 'services'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async e => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    const res = await blogsService.create(newBlog)
    setBlogs([...blogs, res])
    setMessage({ type: 'success', text: `a new blog ${res.title} added` })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <span>Title: </span>
          <input
            type='text'
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </div>
        <div>
          <span>Author: </span>
          <input
            type='text'
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          <span>Url: </span>
          <input
            type='text'
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          />
        </div>
        <button>Create</button>
      </form>
    </>
  )
}

export default BlogForm
