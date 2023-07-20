import { ROUTER } from '@/configs/router'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Link to={ROUTER.HOME} className="logo-font">
          vaults
        </Link>
        <span className="attribution">An interactive learning project from HUST students</span>
      </div>
    </footer>
  )
}

export default memo(Footer)
