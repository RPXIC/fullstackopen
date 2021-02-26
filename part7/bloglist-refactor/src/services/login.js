import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const loginService = async credentials => {
  const user = await axios.post(baseUrl, credentials)
  return user
}

export default loginService
