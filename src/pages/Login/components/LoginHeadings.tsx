import { ROUTER } from '@/configs/router'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const LoginHeadings = () => {
  return (
    <>
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <Link to={ROUTER.REGISTER}>Have an account?</Link>
      </p>
    </>
  )
}

export default memo(LoginHeadings)
