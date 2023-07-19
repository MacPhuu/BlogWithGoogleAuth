import { LoginResponse } from '@/configs/api/response'
import { useAuthContext } from '@/hooks/context'
import { IUser } from '@/types/models/IUser'
import { FormEvent, memo, useLayoutEffect, useRef} from 'react'

const LoginForm = () => {
  const {
    login,
    loginWithGoogle,
    state: { isFetching },
  } = useAuthContext()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const errorMessagesRef = useRef<string[]>([])
  const errorMessagesKeyRef = useRef('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    login(
      { user: { email, password } },
      {
        onSuccess: (result: LoginResponse) => {
          errorMessagesRef.current = []
          localStorage.setItem('token', result.user.token)
          
          window.location.reload()
        },
        onError: ([errorsKey, errors]) => {
          errorMessagesRef.current = [...errorMessagesRef.current, ...errors]
          errorMessagesKeyRef.current = errorsKey
        },
      }
    )
  }
  const handleLoginWithGoogle =()=>{
    loginWithGoogle({
      onSuccess: (user: IUser) => {
        errorMessagesRef.current = []
        
        window.location.reload()
      },
      onError: ([errorsKey, errors]) => {
        errorMessagesRef.current = [...errorMessagesRef.current, ...errors]
        errorMessagesKeyRef.current = errorsKey
      },
    });
  }
  
  useLayoutEffect(() => {
    document.title = 'Login - Conduit'
  }, [])

  return (
    <>
      {errorMessagesRef.current.length > 0 && (
        <ul className="error-messages">
          {errorMessagesRef.current.map((errorMessage, index) => (
            <li key={index}>
              {errorMessagesKeyRef.current} {errorMessage}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <input ref={emailRef} className="form-control form-control-lg" type="text" placeholder="Email" />
        </fieldset>
        <fieldset className="form-group">
          <input ref={passwordRef} className="form-control form-control-lg" type="password" placeholder="Password" />
        </fieldset>
        <button disabled={isFetching} className="btn btn-lg btn-primary pull-xs-right" type="submit">
          {isFetching ? 'Loading...' : 'Sign in'}
        </button>
      </form>
      <button onClick={handleLoginWithGoogle}  disabled={isFetching} className="btn btn-lg btn-primary pull-xs-right" type="submit">
          {isFetching ? 'Loading...' : 'Login With Google'}
        </button>
    </>
  )
}

export default memo(LoginForm)
