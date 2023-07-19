import { articleActions } from '@/actions/article'
import { favoritesAction } from '@/actions/favorites'
import PageLoader from '@/components/PageLoader'
import { IArticle } from '@/types/models/IArticle'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleCommentsSection from './components/ArticleCommentsSection'
import ArticleMetaInformation from './components/ArticleMetaInformation'
import ArticleTagsList from './components/ArticleTagsList'

const Article = () => {
  const [article, setArticle] = useState<IArticle>()
  const [isFetchingArticle, setIsFetchingArticle] = useState<boolean>(false)

  // Handling favorited state
  const [favoritesCount, setFavoritesCount] = useState<number>(0)
  const [favorited, setFavorited] = useState<boolean>(false)

  const { slug } = useParams()

  const fetchArticleItem = () => {
    setIsFetchingArticle(true)
    if (!slug) return
    articleActions.getArticle(slug, {
      onSuccess: (result: IArticle) => {
        setArticle(result)
        setFavoritesCount(result.favoritesCount)
        setFavorited(result.favorited)
        document.title = `${result.title} - Conduit`
      },
      onFinally: () => setIsFetchingArticle(false),
    })
  }

  useEffect(() => {
    fetchArticleItem()
  }, [])

  if (!article) return isFetchingArticle ? <PageLoader /> : <div>Article not found</div>

  const handleFavoriteButtonClick = () => {
    if (favorited) {
      favoritesAction.favoriteArticle(article.slug, {
        onSuccess: () => {
          setFavorited(prev => !prev)
          setFavoritesCount(prev => prev - 1)
        },
      })
      return
    }
    favoritesAction.unfavoriteArticle(article.slug, {
      onSuccess: () => {
        setFavorited(prev => !prev)
        setFavoritesCount(prev => prev + 1)
      },
    })
  }

  return (
    <div className="article-page">
      {/* Banner */}
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMetaInformation
            favorited={favorited}
            favoritesCount={favoritesCount}
            article={article}
            handleFavoriteButtonClick={handleFavoriteButtonClick}
          />
        </div>
      </div>
      {/* Content */}
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div>
              <div ng-bind-html="::$ctrl.article.body" className="ng-binding">
                <p>{article.body}</p>
              </div>
            </div>
            <ArticleTagsList tags={article.tagList} />
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <ArticleMetaInformation
            favorited={favorited}
            favoritesCount={favoritesCount}
            article={article}
            handleFavoriteButtonClick={handleFavoriteButtonClick}
          />
        </div>
        <ArticleCommentsSection slug={article.slug} />
      </div>
    </div>
  )
}

export default Article
