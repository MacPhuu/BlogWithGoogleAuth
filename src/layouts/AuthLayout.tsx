import { ROUTER } from '@/configs/router'
import { isLoggedin } from '@/utils/storage'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  if (isLoggedin) {
    return <Navigate to={ROUTER.HOME} />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
