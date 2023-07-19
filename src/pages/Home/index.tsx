import { useEffect, useState } from 'react'
import HomeArticlesList from './components/HomeArticlesList'
import TagList from './components/TagList'

const Home = () => {
  const [selectedTag, setSelectedTag] = useState<string>()
  const [articlesType, setArticlesType] = useState<string>('FEED')

  useEffect(() => {
    document.title = 'Home — Conduit'
  }, [])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <HomeArticlesList selectedTag={selectedTag} articlesType={articlesType} setArticlesType={setArticlesType} />

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList setSelectedTag={setSelectedTag} setArticlesType={setArticlesType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
