import { useEffect, useState,memo,useRef } from 'react'
import {auth,provider} from "@/configs/GoogleAuth/config";
import { signInWithPopup } from 'firebase/auth';
import { useAuthContext } from '@/hooks/context'

function SignIn(){
  const {
    state: { currentUser },
    editCurrentUser,
  } = useAuthContext()
    const [,setValue] = useState<string|null>(null)


    const googleLogin = ()=>{
      
        signInWithPopup(auth,provider).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem("email",data.user.email||'{}')
          data.user.getIdToken().then(token=>{
            localStorage.setItem("token",token)
            
          })
          console.log(data)
          const image = data.user.photoURL||""
          const bio = data.user.uid
          const username = data.user.displayName||""
          const email = data.user.email||""
          const password = ""

          editCurrentUser({ user: { bio, email, image, password, username } })

          window.location.reload();
        })
        useEffect(()=>{
          setValue(localStorage.getItem('email'))
        })
    }
return(
            <button onClick={googleLogin}  className="btn btn-lg btn-primary pull-xs-right" type="submit">
              Sign In With Google
            </button>
)
}
export default memo(SignIn);