import { blogsService } from 'services'

const Account = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.clear()
    blogsService.setToken(null)
    setUser(null)
  }

  return (
    <p>
      {user.name}
      <button onClick={handleLogout}>Logout</button>
    </p>
  )
}

export default Account
