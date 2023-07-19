import { ROUTER } from '@/configs/router'
import { useNavigate } from 'react-router-dom'

const ProfileEditButton = () => {
  const navigate = useNavigate()

  const handleEditProfileButtonClick = () => {
    navigate(ROUTER.SETTINGS, { replace: true })
  }

  return (
    <button onClick={handleEditProfileButtonClick} className="btn btn-sm btn-outline-secondary action-btn">
      <i className="ion-gear-a"></i>
      &nbsp; Edit Profile Settings
    </button>
  )
}

export default ProfileEditButton
