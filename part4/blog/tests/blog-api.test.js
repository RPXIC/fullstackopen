const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany({})
  helper.registerInitialUser()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('get', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blog')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed with sanitized id toJson()', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blog/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
    expect(resultBlog.body.id).toBeDefined()
    expect(resultBlog.body._id).toBeUndefined()
  })
})

describe('post', () => {
  test('adding a blog, expect it to be saved, contain a title with 200 res', async () => {
    const userLogged = await api
      .post('/api/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { username, token } = userLogged.body

    const newBlog = {
      author: username,
      url: 'www.page.net',
      title: 'React Native',
      likes: 17,
    }

    await api
      .post('/api/blog')
      .set({
        Authorization: `bearer ${token}`,
      })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('React Native')
  })

  test('adding a blog without likes, expect it to be saved with default likes 0', async () => {
    const userLogged = await api
      .post('/api/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { username, token } = userLogged.body

    const newBlog = {
      author: username,
      url: 'www.page.net',
      title: 'React Native',
    }

    await api
      .post('/api/blog')
      .set({
        Authorization: `bearer ${token}`,
      })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogExist = blogsAtEnd.find(blog => blog.author === newBlog.author)
    expect(blogExist.likes).toBe(0)
  })

  test('adding a blog without title and url, expect it to res 400', async () => {
    const userLogged = await api
      .post('/api/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { username, token } = userLogged.body

    const newBlog = {
      author: username,
      likes: 7,
    }

    await api
      .post('/api/blog')
      .set({
        Authorization: `bearer ${token}`,
      })
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete', () => {
  test('deleting a blog by id', async () => {
    const userLogged = await api
      .post('/api/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { username, token } = userLogged.body

    const newBlog = {
      author: username,
      url: 'www.page.net',
      title: 'React Native',
      likes: 17,
    }

    const blogToDelete = await api
      .post('/api/blog')
      .set({
        Authorization: `bearer ${token}`,
      })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(`/api/blog/${blogToDelete.body.id}`)
      .set({
        Authorization: `bearer ${token}`,
      })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.body.title)
  })
})

describe('update', () => {
  test('updating blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const selectFirstBlog = blogsAtStart[0]

    const blogToUpdate = {
      title: selectFirstBlog.title,
      author: selectFirstBlog.author,
      url: selectFirstBlog.url,
      likes: selectFirstBlog.likes + 10,
    }

    const res = await api
      .put(`/api/blog/${selectFirstBlog.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toEqual(selectFirstBlog.likes + 10)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toEqual(selectFirstBlog.likes + 10)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
