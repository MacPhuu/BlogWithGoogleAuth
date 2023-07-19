import ArticlePreviewFavoriteButton from '@/components/ArticlePreviewFavoriteButton'
import { ROUTER } from '@/configs/router'
import { IArticle } from '@/types/models/IArticle'
import { formatDate } from '@/utils/helper'
import React from 'react'
import ArticlePreviewTagsList from './ArticlePreviewTagsList'
import { Link } from 'react-router-dom'

interface ArticlePreviewItemProps {
  article: IArticle
}

const ArticlePreviewItem: React.FC<ArticlePreviewItemProps> = ({ article }) => {
  const profilePageUrl = `${ROUTER.PROFILE_BASE}/${article.author.username}`

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={profilePageUrl}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={profilePageUrl} className="author">
            {article.author.username}
          </Link>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>
        <ArticlePreviewFavoriteButton
          slug={article.slug}
          originalFavorited={article.favorited}
          originalFavoritesCount={article.favoritesCount}
        />
      </div>
      <Link to={`${ROUTER.ARTICLE_BASE}/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
      <ArticlePreviewTagsList article={article} />
    </div>
  )
}

export default ArticlePreviewItem
