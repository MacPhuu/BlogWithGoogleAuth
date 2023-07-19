import { IProfile } from './IProfile'

export interface IArticle {
  slug: string
  title: string
  description: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: IProfile
  body: string
}
