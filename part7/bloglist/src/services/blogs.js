import axios from 'axios'
import { sortByValues } from 'utils/utils'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const sorted = sortByValues(response.data, 'likes')
  return sorted
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async newBlog => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const commentBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  )
  return response.data
}

export default { getAll, create, setToken, updateBlog, deleteBlog, commentBlog }
