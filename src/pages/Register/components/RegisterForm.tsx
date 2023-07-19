import { useAuthContext } from '@/hooks/context'
import { FormEvent, useLayoutEffect, useRef } from 'react'

const RegisterForm = () => {
  const {
    register,
    state: { isFetching },
  } = useAuthContext()

  useLayoutEffect(() => {
    document.title = 'Register - Conduit'
  }, [])

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const errorMessagesRef = useRef<string[]>([])
  const errorMessagesKeyRef = useRef('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = usernameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    register(
      { user: { email, password, username } },
      {
        onSuccess: () => {
          errorMessagesRef.current = []
          window.location.reload()
        },
        onError: ([errorsKey, errors]) => {
          errorMessagesRef.current = [...errorMessagesRef.current, ...errors]
          errorMessagesKeyRef.current = errorsKey
        },
      }
    )
  }

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
          <input ref={usernameRef} className="form-control form-control-lg" type="text" placeholder="Your Name" />
        </fieldset>
        <fieldset className="form-group">
          <input ref={emailRef} className="form-control form-control-lg" type="text" placeholder="Email" />
        </fieldset>
        <fieldset className="form-group">
          <input ref={passwordRef} className="form-control form-control-lg" type="password" placeholder="Password" />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right"> {isFetching ? 'Loading...' : 'Sign up'}</button>
      </form>
    </>
  )
}

export default RegisterForm
