import { IArticle } from '@/types/models/IArticle'
import { IProfile } from '@/types/models/IProfile'
import { IUser } from '@/types/models/IUser'

// Tags
export interface GetTagsResponse {
  tags: string[]
}

// Auth
export interface LoginResponse {
  user: IUser
}

export interface RegisterResponse {
  user: IUser
}

// Profile
export type ProfileResponse = IProfile

// Articles
export interface GetArticlesResponse {
  articles: IArticle[]
  articlesCount: number
}
