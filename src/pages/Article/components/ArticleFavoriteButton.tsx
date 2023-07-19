import React from 'react'

interface ArticleFavoriteButtonProps {
  favorited: boolean
  favoritesCount: number
  handleFavoriteButtonClick: () => void
}

const ArticleFavoriteButton: React.FC<ArticleFavoriteButtonProps> = ({
  handleFavoriteButtonClick,
  favorited,
  favoritesCount,
}) => {
  return (
    <button
      onClick={handleFavoriteButtonClick}
      className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
    >
      <i className="ion-heart"></i>
      &nbsp; Favorite Article <span className="counter">{favoritesCount}</span>
    </button>
  )
}

export default ArticleFavoriteButton
