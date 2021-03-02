import { blogsServices } from 'services'
import { setNotification } from 'reducers/notificationReducer'
import { sortByValues } from 'utils/utils'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.data

    case 'CREATE_BLOG':
      return [...state, action.data]

    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)

    case 'UPDATE_BLOG':
      return sortByValues(
        state.map(blog => (blog.id === action.data.id ? action.data : blog)),
        'likes'
      )

    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogsServices.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      //   blogFormRef.current.toggleVisibility()
      const blog = await blogsServices.create(newBlog)
      dispatch({
        type: 'CREATE_BLOG',
        data: blog,
      })
      dispatch(setNotification(`a new blog ${blog.title} added`, 3, 'success'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 3, 'warning'))
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      try {
        await blogsServices.deleteBlog(blog.id)
        dispatch({
          type: 'DELETE_BLOG',
          data: blog.id,
        })
        dispatch(setNotification('blog deleted', 3, 'success'))
      } catch (error) {
        dispatch(setNotification(error.response.data.error, 3, 'warning'))
      }
    }
  }
}

export const updateBlog = newBlog => {
  return async dispatch => {
    try {
      const blog = await blogsServices.updateBlog(newBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: blog,
      })
      dispatch(setNotification(`a new like ${blog.title} added`, 3, 'success'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 3, 'warning'))
    }
  }
}

export const likeABlog = blog => {
  return async dispatch => {
    const { title, author, url, likes, user, id } = blog
    const newBlog = { title, author, url, likes: likes + 1, user: user.id, id }
    dispatch(updateBlog(newBlog))
  }
}

export default blogReducer
