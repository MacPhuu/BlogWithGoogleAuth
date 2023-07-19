import { apiCall } from '@/configs/api'
import { API_URLS } from '@/configs/api/endpoint'
import { Callback } from '@/types/others/callback'

const favoriteArticle = async (slug: string, cb?: Callback) => {
  const { response, error } = await apiCall(API_URLS.FAVORITES.FAVORITE_ARTICLE(slug))
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const unfavoriteArticle = async (slug: string, cb?: Callback) => {
  const { response, error } = await apiCall(API_URLS.FAVORITES.UNFAVORITE_ARTICLE(slug))
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

export const favoritesAction = { favoriteArticle, unfavoriteArticle }
