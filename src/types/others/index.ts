export enum ArticleType {
  FEED = 'FEED',
  GLOBAL = 'GLOBAL',
  SELF = 'SELF',
  FAVORITED = 'FAVORITED',
}

export interface ListStateProperties {
  offset: number
  limit: number
}
