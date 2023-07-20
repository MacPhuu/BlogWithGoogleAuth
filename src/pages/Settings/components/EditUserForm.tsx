import { useAuthContext } from '@/hooks/context'
import { FormEvent, useRef } from 'react'

const EditUserForm = () => {
  const {
    state: { currentUser },
    editCurrentUser,
  } = useAuthContext()

  const imgRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const image = imgRef.current?.value || ''
    const bio = bioRef.current?.value || ''
    const username = usernameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    editCurrentUser({ user: { bio, email, image, password, username } }, { onSuccess: () => window.location.reload() })
  }
  return (
    <form onSubmit={handleSubmitEdit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            ref={imgRef}
            defaultValue={currentUser?.image}
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            ref={usernameRef}
            defaultValue={currentUser?.username}
            className="form-control form-control-lg"
            type="text"
            placeholder="Your Name"
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            ref={bioRef}
            defaultValue={currentUser?.bio}
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            ref={emailRef}
            defaultValue={currentUser?.email}
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="form-group">
          <input ref={passwordRef} className="form-control form-control-lg" type="password" placeholder="Password" />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
      </fieldset>
    </form>
  )
}

export default EditUserForm
