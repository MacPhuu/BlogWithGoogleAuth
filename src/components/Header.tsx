import { ROUTER } from '@/configs/router'
import { useAuthContext } from '@/hooks/context'
import { isLoggedin } from '@/utils/storage'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const {
    state: { currentUser },
  } = useAuthContext()

  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={ROUTER.HOME}>
          vaults
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to={ROUTER.HOME} className={`nav-link ${pathname === ROUTER.HOME && 'active'}`}>
              Home
            </Link>
          </li>
          {isLoggedin ? (
            <>
              <li className="nav-item">
                <Link to={ROUTER.EDITOR} className={`nav-link ${pathname === ROUTER.EDITOR && 'active'}`}>
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link to={ROUTER.SETTINGS} className={`nav-link ${pathname === ROUTER.SETTINGS && 'active'}`}>
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`${ROUTER.PROFILE_BASE}/${currentUser?.username}`} className="nav-link">
                  <img src={currentUser?.image} style={{ width: '26px', height: '26px', marginRight: '5px' }} />
                  {currentUser?.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTER.LOGIN}>
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTER.REGISTER}>
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default memo(Header)
