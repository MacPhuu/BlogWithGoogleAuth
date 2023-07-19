import ArticlesList from '../../Article/components/ArticlesList'
import ArticleNavMenuItem from './ArticleNavMenuItem'

interface HomeArticlesListProps {
  selectedTag: string | undefined
  articlesType: string
  setArticlesType: React.Dispatch<React.SetStateAction<string>>
}

const HomeArticlesList: React.FC<HomeArticlesListProps> = ({ selectedTag, articlesType, setArticlesType }) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <ArticleNavMenuItem articlesType={articlesType} setArticlesType={setArticlesType} type={'FEED'}>
            Your Feed
          </ArticleNavMenuItem>
          <ArticleNavMenuItem articlesType={articlesType} setArticlesType={setArticlesType} type={'GLOBAL'}>
            Global Feed
          </ArticleNavMenuItem>
          {selectedTag && (
            <ArticleNavMenuItem articlesType={articlesType} setArticlesType={setArticlesType} type={selectedTag}>
              #{selectedTag}
            </ArticleNavMenuItem>
          )}
        </ul>
      </div>
      <ArticlesList articlesType={articlesType} />
    </div>
  )
}

export default HomeArticlesList
