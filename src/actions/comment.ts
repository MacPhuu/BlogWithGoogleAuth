import { apiCall } from '@/configs/api'
import { API_URLS } from '@/configs/api/endpoint'
import { CreateCommentPayload } from '@/configs/api/payload'
import { Callback } from '@/types/others/callback'

const createComment = async (slug: string, payload: CreateCommentPayload, cb?: Callback) => {
  const { response, error } = await apiCall({
    ...API_URLS.COMMENTS.CREATE_COMMENT_FOR_ARTICLE(slug),
    payload,
  })
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.comment)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const getComments = async (slug: string, cb?: Callback) => {
  const { response, error } = await apiCall(API_URLS.COMMENTS.GET_COMMENTS_BY_ARTICLES(slug))
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.comments)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

const deleteComment = async (slug: string, id: string, cb?: Callback) => {
  const { response, error } = await apiCall(API_URLS.COMMENTS.DELETE_COMMENT_FOR_ARTICLE(slug, id))
  if (!error && response?.status === 200) {
    cb?.onSuccess?.(response.data.comments)
  } else {
    cb?.onError?.()
  }
  cb?.onFinally?.()
}

export const commentActions = { createComment, getComments, deleteComment }
