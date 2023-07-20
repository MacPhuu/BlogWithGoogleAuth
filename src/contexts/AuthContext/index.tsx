/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthAction, AuthActionType, AuthState } from './action'
import { createContext, useReducer, useRef } from 'react'
import { apiCall } from '@/configs/api'
import { Callback } from '@/types/others/callback'
import { API_URLS } from '@/configs/api/endpoint'
import { EditCurrentUserPayload, LoginPayload, RegisterPayload } from '@/configs/api/payload'
import { auth, provider } from '@/configs/GoogleAuth/config'
import { signInWithPopup } from 'firebase/auth'
import { LoginResponse } from '@/configs/api/response'

const initialState: AuthState = {
  isFetching: false,
  currentUser: undefined,
}

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.AUTH_ACTION_PENDING:
      return { ...state, isFetching: true }
    case AuthAction.AUTH_ACTION_FAILURE:
      return { ...state, isFetching: false }

    case AuthAction.LOGIN_SUCCESS:
      return { ...state, isFetching: false }
    case AuthAction.REGISTER_SUCCESS:
      return { ...state, isFetching: false }
    case AuthAction.GET_CURRENT_USER_SUCCESS:
      return { ...state, isFetching: false, currentUser: action.payload }
    case AuthAction.LOGIN_WITH_GOOGLE_SUCCESS:
      return { ...state, isFetching: false, currentUser: action.payload }

    default:
      return state
  }
}

function useAuthReducer(_state = initialState) {
  const [state, dispatch] = useReducer(authReducer, _state)

  const login = async (payload: LoginPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING })

    const { response, error } = await apiCall({ ...API_URLS.USERS_AND_AUTHENTICATION.LOGIN(), payload })

    if (!error && response?.status === 200) {
      dispatch({ type: AuthAction.LOGIN_SUCCESS })
      cb?.onSuccess?.(response.data)
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE })

      const { errors } = error.response.data
      const [firstErrorKey, firstErrorMessage] = Object.entries(errors)[0]

      cb?.onError?.([firstErrorKey, firstErrorMessage])
    }
  }

  const register = async (payload: RegisterPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING })

    const { response, error } = await apiCall({ ...API_URLS.USERS_AND_AUTHENTICATION.REGISTER(), payload })

    if (!error && response?.status === 200) {
      dispatch({ type: AuthAction.REGISTER_SUCCESS })
      cb?.onSuccess?.(response.data)
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE })

      const { errors } = error.response.data
      const [firstErrorKey, firstErrorMessage] = Object.entries(errors)[0]

      cb?.onError?.([firstErrorKey, firstErrorMessage])
    }
  }

  const getCurrentUser = async (cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING })

    const { response, error } = await apiCall({ ...API_URLS.USERS_AND_AUTHENTICATION.GET_CURRENT_USER() })

    if (!error && response?.status === 200) {
      const currentUser = response.data.user
      dispatch({ type: AuthAction.GET_CURRENT_USER_SUCCESS, payload: currentUser })
      cb?.onSuccess?.(currentUser)
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE })
      cb?.onError?.()
    }
  }

  const editCurrentUser = async (payload: EditCurrentUserPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING })

    const { response, error } = await apiCall({ ...API_URLS.USERS_AND_AUTHENTICATION.EDIT_CURRENT_USER(), payload })

    if (!error && response?.status === 200) {
      const result = response.data.user
      console.log(result)
      dispatch({ type: AuthAction.EDIT_CURRENT_USER_SUCCESS, payload: result })
      cb?.onSuccess?.(result)
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE })
      cb?.onError?.()
    }
  }
  const errorMessagesRef = useRef<string[]>([])
  const errorMessagesKeyRef = useRef('')

  const loginWithGoogle = async (cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING })
    signInWithPopup(auth, provider).then(data => {
      const email = data.user.email || ''
      const username = data.user.displayName || ''
      const password = 'password'
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
            console.log(errorsKey)
          },
        }
      )
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
      dispatch({ type: AuthAction.AUTH_ACTION_PENDING })
      cb?.onSuccess?.(data)
    })
  }

  return { state, login, register, getCurrentUser, editCurrentUser, loginWithGoogle }
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {},
  register: async () => {},
  getCurrentUser: async () => {},
  editCurrentUser: async () => {},
  loginWithGoogle: async () => {},
})

interface AuthProviderProps {
  children: React.ReactNode | string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authReducer = useAuthReducer()

  return <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>
}
