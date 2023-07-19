import { apiCall } from '@/configs/api'
import { API_URLS } from '@/configs/api/endpoint'
import { Callback } from '@/types/others/callback'

const getProfile = async (username: string, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.PROFILE.GET_PROFILE_BY_USERNAME(username) })
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.profile)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const followUser = async (username: string, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.PROFILE.FOLLOW_USER(username) })
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.profile)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const unfollowUser = async (username: string, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.PROFILE.UNFOLLOW_USER(username) })
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.profile)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

export const profileActions = { getProfile, followUser, unfollowUser }
