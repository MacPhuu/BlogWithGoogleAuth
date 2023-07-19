import ArticlesList from '@/pages/Article/components/ArticlesList'
import ArticleNavMenuItem from '@/pages/Home/components/ArticleNavMenuItem'
import { ArticleType } from '@/types/others'
import { useState } from 'react'

const ProfileArticlesList = () => {
  const [articlesType, setArticlesType] = useState<ArticleType>(ArticleType.SELF)

  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <ArticleNavMenuItem articlesType={articlesType} setArticlesType={setArticlesType} type={ArticleType.SELF}>
            My Articles
          </ArticleNavMenuItem>
          <ArticleNavMenuItem
            articlesType={articlesType}
            setArticlesType={setArticlesType}
            type={ArticleType.FAVORITED}
          >
            Favorited Articles
          </ArticleNavMenuItem>
        </ul>
      </div>
      <ArticlesList articlesType={articlesType} />
    </div>
  )
}

export default ProfileArticlesList
