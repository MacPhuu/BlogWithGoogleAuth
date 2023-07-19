import { ROUTER } from '@/configs/router'
import { useAuthContext } from '@/hooks/context'
import { IArticle } from '@/types/models/IArticle'
import { formatDate } from '@/utils/helper'
import React, { useMemo } from 'react'
import ArticleFavoriteButton from './ArticleFavoriteButton'
import ArticleFollowButton from './ArticleFollowButton'
import SelfArticleFunctions from './SelfArticleFunctions'
import { Link } from 'react-router-dom'

interface ArticleMetaInformationProps {
  article: IArticle
  favorited: boolean
  favoritesCount: number
  handleFavoriteButtonClick: () => void
}

const ArticleMetaInformation: React.FC<ArticleMetaInformationProps> = ({
  article,
  handleFavoriteButtonClick,
  favorited,
  favoritesCount,
}) => {
  const authorURL = useMemo(() => `${ROUTER.PROFILE_BASE}/${article?.author.username}`, [article])

  const {
    state: { currentUser },
  } = useAuthContext()

  const currentUserName = currentUser?.username
  const authorName = article.author.username
  const isSelfArticle = useMemo(() => currentUserName === authorName, [currentUserName, authorName])

  return (
    <div className="article-meta">
      <Link to={authorURL}>
        <img src={article.author.image} />
      </Link>
      <div className="info">
        <Link to={authorURL} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatDate(article.createdAt)}</span>
      </div>
      {isSelfArticle ? (
        <SelfArticleFunctions slug={article.slug} />
      ) : (
        <>
          <ArticleFollowButton author={article.author} />
          &nbsp;&nbsp;
          <ArticleFavoriteButton
            handleFavoriteButtonClick={handleFavoriteButtonClick}
            favorited={favorited}
            favoritesCount={favoritesCount}
          />
        </>
      )}
    </div>
  )
}

export default ArticleMetaInformation
