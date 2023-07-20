import { favoritesAction } from '@/actions/favorites'
import React, { useState } from 'react'

interface ArticlePreviewFavoriteButtonProps {
  originalFavoritesCount: number
  originalFavorited: boolean
  slug: string
}

const ArticlePreviewFavoriteButton: React.FC<ArticlePreviewFavoriteButtonProps> = ({
  slug,
  originalFavoritesCount,
  originalFavorited,
}) => {
  const [favoritesCount, setFavoritesCount] = useState<number>(originalFavoritesCount)
  const [favorited, setFavorited] = useState<boolean>(originalFavorited)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState<boolean>(false)

  const handleFavoriteButtonClick = () => {
    setIsLoadingFavorite(true)
    const onFinally = () => setIsLoadingFavorite(false)

    console.log('clicked')

    if (favorited) {
      favoritesAction.favoriteArticle(slug, {
        onSuccess: () => {
          setFavorited(prev => !prev)
          setFavoritesCount(prev => prev - 1)
        },
        onFinally,
      })
      return
    }
    favoritesAction.unfavoriteArticle(slug, {
      onSuccess: () => {
        setFavorited(prev => !prev)
        setFavoritesCount(prev => prev + 1)
      },
      onFinally,
    })
  }

  return (
    <button
      disabled={isLoadingFavorite}
      onClick={handleFavoriteButtonClick}
      className={`btn ${favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right`}
    >
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  )
}

export default ArticlePreviewFavoriteButton
