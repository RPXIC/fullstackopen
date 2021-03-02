const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const { id } = request.params
  const blog = await Blog.findById(id)

  const newBlog = {
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments.concat(comment),
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
    new: true,
  })
  response.json(updatedBlog.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
  const blogById = await Blog.findById(request.params.id)
  if (blogById) {
    response.json(blogById.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if (decodedToken.id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'Unauthorized, only author can delete it' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
