import { ROUTER } from '@/configs/router'
import { Link } from 'react-router-dom'

const RegisterHeadings = () => {
  return (
    <>
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <Link to={ROUTER.LOGIN}>Need an account?</Link>
      </p>
    </>
  )
}

export default RegisterHeadings
