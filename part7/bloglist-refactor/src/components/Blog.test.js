import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('', () => {
  let component
  let updateBlog
  const user = { username: 'username of blog' }
  window.localStorage.setItem('user', JSON.stringify(user))

  beforeEach(() => {
    const blog = {
      author: 'author of blog',
      title: 'title of blog',
      url: 'url of blog',
      likes: 2,
      user: { username: 'username of blog' },
    }
    updateBlog = jest.fn()
    component = render(<Blog blog={blog} updateBlog={updateBlog} />)
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('title of blog')
    expect(component.container).toHaveTextContent('author of blog')
    expect(component.container).not.toHaveTextContent('url of blog')
    expect(component.container).not.toHaveTextContent(2)
  })

  test('renders content after click show more', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('title of blog')
    expect(component.container).toHaveTextContent('author of blog')
    expect(component.container).toHaveTextContent('url of blog')
    expect(component.container).toHaveTextContent(2)
  })

  test('likes button event should be called 2 times', () => {
    const buttonShow = component.getByText('show')
    fireEvent.click(buttonShow)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
