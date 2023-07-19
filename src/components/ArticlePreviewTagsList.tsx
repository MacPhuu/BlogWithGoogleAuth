import { IArticle } from '@/types/models/IArticle'
import React from 'react'

interface ArticlePreviewTagsListProps {
  article: IArticle
}
const ArticlePreviewTagsList: React.FC<ArticlePreviewTagsListProps> = ({ article }) => {
  const { tagList, slug } = article
  return (
    <ul className="tag-list" style={{ float: 'right' }}>
      {tagList.map((tag, idx) => (
        <li key={`article-tag-${idx}-${slug}`} className="tag-default tag-pill tag-outline ng-binding ng-scope">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default ArticlePreviewTagsList
