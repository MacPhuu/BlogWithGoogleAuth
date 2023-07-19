import { IProfile } from './IProfile'

export interface IComment {
  body: string
  id: number
  createdAt: string
  updatedAt: string
  author: IProfile
}
