import { ROUTER } from '@/configs/router'
import { useNavigate } from 'react-router-dom'

const LogOutButton = () => {
  const navigate = useNavigate()

  const handleLogoutButtonClick = () => {
    localStorage.removeItem('token')
    navigate(ROUTER.HOME, { replace: true })
    window.location.reload()
  }

  return (
    <button className="btn btn-outline-danger" onClick={handleLogoutButtonClick}>
      Or click here to logout.
    </button>
  )
}

export default LogOutButton
