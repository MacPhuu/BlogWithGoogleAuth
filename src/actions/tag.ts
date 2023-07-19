import { apiCall } from '@/configs/api'
import { API_URLS } from '@/configs/api/endpoint'
import { Callback } from '@/types/others/callback'

const getAllTags = async (cb?: Callback) => {
  const { response, error } = await apiCall(API_URLS.DEFAULT.GET_TAGS())

  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.tags)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

export const tagActions = { getAllTags }
