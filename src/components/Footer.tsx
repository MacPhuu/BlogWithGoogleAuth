import { THINKSTER_WEBSITE } from '@/configs/constant'
import { ROUTER } from '@/configs/router'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Link to={ROUTER.HOME} className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from <a href={THINKSTER_WEBSITE}>Thinkster</a>. Code &amp; design licensed
          under MIT.
        </span>
      </div>
    </footer>
  )
}

export default memo(Footer)
