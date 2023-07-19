import { IUser } from '@/types/models/IUser'

export type AuthState = {
  isFetching: boolean
  currentUser?: IUser
}

export enum AuthAction {
  AUTH_ACTION_PENDING = 'AUTH_ACTION_PENDING',
  AUTH_ACTION_FAILURE = 'AUTH_ACTION_FAILURE',

  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_WITH_GOOGLE_SUCCESS ='LOGIN_WITH_GOOGLE_SUCCESS',
  GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS',
  EDIT_CURRENT_USER_SUCCESS = 'EDIT_CURRENT_USER_SUCCESS',
}

interface AuthActionPending {
  type: AuthAction.AUTH_ACTION_PENDING
}

interface AuthActionFailure {
  type: AuthAction.AUTH_ACTION_FAILURE
}

interface LoginSuccess {
  type: AuthAction.LOGIN_SUCCESS
}

interface RegisterSuccess {
  type: AuthAction.REGISTER_SUCCESS
}

interface GetCurrentUserSuccess {
  type: AuthAction.GET_CURRENT_USER_SUCCESS
  payload: IUser
}

interface EditCurrentUserSuccess {
  type: AuthAction.EDIT_CURRENT_USER_SUCCESS
  payload: IUser
}
interface LoginWithGoogleSuccess {
  type: AuthAction.LOGIN_WITH_GOOGLE_SUCCESS
  payload: IUser
}

export type AuthActionType =
  | AuthActionPending
  | AuthActionFailure
  | LoginSuccess
  | RegisterSuccess
  | GetCurrentUserSuccess
  | EditCurrentUserSuccess
  | LoginWithGoogleSuccess
