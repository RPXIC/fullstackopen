const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'rpxic',
    url: 'www.page.com',
    title: 'HTML',
    likes: 10,
  },
  {
    author: 'rpxic2',
    url: 'www.page.es',
    title: 'Javascript',
    likes: 9,
  },
  {
    author: 'rpxic2',
    url: 'www.page.es',
    title: 'Jest',
    likes: 1,
  },
  {
    author: 'rpxic2',
    url: 'www.page.es',
    title: 'React',
    likes: 2,
  },
]

const initialUser = {
  username: 'rpxic1',
  password: '123',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const registerInitialUser = async () => {
  const passwordHash = await bcrypt.hash(initialUser.password, 10)
  const userToSave = new User({ username: initialUser.username, passwordHash })
  await userToSave.save()
}

const retrieveInitialUser = async () => {
  const user = await User.findOne({ username: initialUser.username })
  return user.toJSON()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initialUser,
  registerInitialUser,
  retrieveInitialUser,
}
