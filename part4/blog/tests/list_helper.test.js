const { expect } = require('@jest/globals')
const listHelper = require('../utils/list_helper')

describe('Dummy function', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {
  test('totalLikes returns 4', () => {
    const blogs = [
      {
        title: 'blog1',
        author: 'rpxic',
        url: 'www.page.com',
        likes: 1,
      },
      {
        title: 'blog2',
        author: 'rpxic',
        url: 'www.page.com',
        likes: 3,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(4)
  })

  test('totalLikes returns 0', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
})

describe('favoriteBlog', () => {
  test('favoriteBlog', () => {
    const blogs = [
      {
        title: 'blog1',
        author: 'rpxic',
        likes: 12,
      },
      {
        title: 'blog2',
        author: 'rpxic',
        likes: 12,
      },
      {
        title: 'blog3',
        author: 'rpxic',
        likes: 1,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('favoriteBlog', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(undefined)
  })
})

describe('mostBlogs', () => {
  test('mostblogs', () => {
    const blogs = [
      {
        title: 'blog1',
        author: 'rpxic',
        likes: 12,
      },
      {
        title: 'blog2',
        author: 'rpxic',
        likes: 12,
      },
      {
        title: 'blog3',
        author: 'rpxic2',
        likes: 1,
      },
      {
        title: 'blog3',
        author: 'rpxic2',
        likes: 1,
      },
      {
        title: 'blog3',
        author: 'rpxic2',
        likes: 1,
      },
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result.author).toBe('rpxic2')
  })
})

describe('mostLikes', () => {
  test('mostLikes', () => {
    const blogs = [
      {
        title: 'blog1',
        author: 'rpxic',
        likes: 1,
      },
      {
        title: 'blog2',
        author: 'rpxic',
        likes: 1,
      },
      {
        title: 'blog3',
        author: 'rpxic2',
        likes: 6,
      },
      {
        title: 'blog3',
        author: 'rpxic2',
        likes: 5,
      },
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result.author).toBe('rpxic2')
  })
})
