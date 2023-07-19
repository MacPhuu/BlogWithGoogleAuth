import { apiCall } from '@/configs/api'
import { API_URLS } from '@/configs/api/endpoint'
import { CreateArticlePayload, UpdateArticlePayload } from '@/configs/api/payload'
import { LIST_LIMIT, LIST_PROFILE_LIMIT } from '@/configs/constant'
import { Callback } from '@/types/others/callback'

const getFollowedUsersArticles = async (offset: number, cb?: Callback) => {
  const { response, error } = await apiCall({
    ...API_URLS.ARTICLES.GET_FEED_ARTICLES(),
    params: { offset, limit: LIST_LIMIT },
  })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const getGlobalArticles = async (offset: number, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.ARTICLES.GET_GLOBAL_ARTICLES(), params: { offset } })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const getArticlesByTag = async (tag: string, offset: number, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.ARTICLES.GET_GLOBAL_ARTICLES(), params: { offset, tag } })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const getFavoritedArticles = async (username: string, offset: number, cb?: Callback) => {
  const { response, error } = await apiCall({
    ...API_URLS.ARTICLES.GET_GLOBAL_ARTICLES(),
    params: { favorited: username, limit: LIST_PROFILE_LIMIT, offset: offset },
  })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const getSelfArticles = async (author: string, offset: number, cb?: Callback) => {
  const { response, error } = await apiCall({
    ...API_URLS.ARTICLES.GET_GLOBAL_ARTICLES(),
    params: { author, limit: LIST_PROFILE_LIMIT, offset },
  })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const createArticle = async (payload: CreateArticlePayload, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.ARTICLES.POST_ARTICLE(), payload })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result.article)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const updateArticle = async (slug: string, payload: UpdateArticlePayload, cb?: Callback) => {
  const { response, error } = await apiCall({
    ...API_URLS.ARTICLES.UPDATE_ARTICLE(slug),
    payload,
  })
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.article)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const deleteArticle = async (slug: string, cb?: Callback) => {
  const { error } = await apiCall(API_URLS.ARTICLES.DELETE_ARTICLE(slug))
  if (!error) {
    cb?.onSuccess?.()
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const getArticle = async (slug: string, cb?: Callback) => {
  const { response, error } = await apiCall({ ...API_URLS.ARTICLES.GET_ARTICLE(slug) })

  if (!error && response?.status === 200) {
    const result = response.data
    cb?.onSuccess?.(result.article)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

export const articleActions = {
  getFollowedUsersArticles,
  getGlobalArticles,
  deleteArticle,
  updateArticle,
  createArticle,
  getArticle,
  getFavoritedArticles,
  getSelfArticles,
  getArticlesByTag,
}
