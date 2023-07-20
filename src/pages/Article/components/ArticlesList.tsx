import { articleActions } from '@/actions/article'
import PageLoader from '@/components/PageLoader'
import { GetArticlesResponse } from '@/configs/api/response'
import { LIST_LIMIT } from '@/configs/constant'
import { IArticle } from '@/types/models/IArticle'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticlePreviewItem from '../../../components/ArticlePreviewItem'

interface ArticlesListProps {
  articlesType: string
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articlesType }) => {
  const { username } = useParams()

  const [articles, setArticles] = useState<IArticle[]>([])
  const [isFetchingArticles, setIsFetchingArticles] = useState<boolean>(false)

  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchArticlesList = () => {
    const offset = (currentPage - 1) * LIST_LIMIT

    const onSuccess = (response: GetArticlesResponse) => {
      setArticles(response.articles)
      setTotalPages(Math.floor(response.articlesCount / LIST_LIMIT) + 1)
    }
    const onFinally = () => setIsFetchingArticles(false)

    switch (articlesType) {
      case 'GLOBAL':
        articleActions.getGlobalArticles(offset, { onSuccess, onFinally })
        break
      case 'FEED':
        articleActions.getFollowedUsersArticles(offset, { onSuccess, onFinally })
        break
      case 'FAVORITED':
        if (!username) break
        articleActions.getFavoritedArticles(username, offset, { onSuccess, onFinally })
        break
      case 'SELF':
        if (!username) break
        articleActions.getSelfArticles(username, offset, { onSuccess, onFinally })
        break
      default:
        articleActions.getArticlesByTag(articlesType, offset, { onSuccess, onFinally })
    }
  }

  useEffect(() => {
    setIsFetchingArticles(true)
    fetchArticlesList()
  }, [articlesType, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [articlesType])

  const handlePaginationPageClick = (page: number) => {
    setCurrentPage(page)
  }

  if (isFetchingArticles) {
    return (
      <div className="article-preview">
        <PageLoader />
      </div>
    )
  }

  if (articles.length === 0) {
    return <div className="article-preview">No article found!</div>
  }

  return (
    <>
      {articles.map((article, idx) => (
        <ArticlePreviewItem key={`article-${idx}-${article.slug}`} article={article} />
      ))}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <li
              onClick={() => handlePaginationPageClick(idx + 1)}
              className={`page-item ng-scope ${currentPage === idx + 1 && 'active'}`}
              key={`page-${idx + 1}`}
            >
              <div style={{ cursor: 'pointer' }} className="page-link ng-binding">
                {idx + 1}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default ArticlesList
