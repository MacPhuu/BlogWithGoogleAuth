import { HEADERS } from './header'

export const API_URLS = {
  USERS_AND_AUTHENTICATION: {
    LOGIN: () => ({
      endPoint: 'users/login',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    REGISTER: () => ({
      endPoint: 'users',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    GET_CURRENT_USER: () => ({
      endPoint: 'user',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    EDIT_CURRENT_USER: () => ({
      endPoint: 'user',
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
  },
  PROFILE: {
    GET_PROFILE_BY_USERNAME: (username: string) => ({
      endPoint: `profiles/${username}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    FOLLOW_USER: (username: string) => ({
      endPoint: `profiles/${username}/follow`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    UNFOLLOW_USER: (username: string) => ({
      endPoint: `profiles/${username}/follow`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
  },
  ARTICLES: {
    GET_FEED_ARTICLES: () => ({
      endPoint: 'articles/feed',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    GET_GLOBAL_ARTICLES: () => ({
      endPoint: 'articles',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    POST_ARTICLE: () => ({
      endPoint: 'articles',
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    GET_ARTICLE: (slug: string) => ({
      endPoint: `articles/${slug}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    UPDATE_ARTICLE: (slug: string) => ({
      endPoint: `articles/${slug}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    DELETE_ARTICLE: (slug: string) => ({
      endPoint: `articles/${slug}`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
  },
  COMMENTS: {
    GET_COMMENTS_BY_ARTICLES: (slug: string) => ({
      endPoint: `articles/${slug}/comments`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    CREATE_COMMENT_FOR_ARTICLE: (slug: string) => ({
      endPoint: `articles/${slug}/comments`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    DELETE_COMMENT_FOR_ARTICLE: (slug: string, id: string) => ({
      endPoint: `articles/${slug}/comments/${id}`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
  },
  FAVORITES: {
    FAVORITE_ARTICLE: (slug: string) => ({
      endPoint: `articles/${slug}/favorite`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    UNFAVORITE_ARTICLE: (slug: string) => ({
      endPoint: `articles/${slug}/favorite`,
      method: 'DELETE',
      headers: HEADERS.authHeader(),
    }),
  },
  DEFAULT: {
    GET_TAGS: () => ({
      endPoint: `tags`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
  },
}
