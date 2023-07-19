import React, { ReactNode } from 'react'

interface ArticleNavMenuItemProps {
  type: string
  children: ReactNode
  articlesType: string
  setArticlesType: React.Dispatch<React.SetStateAction<string>>
}

const ArticleNavMenuItem: React.FC<ArticleNavMenuItemProps> = ({ children, articlesType, setArticlesType, type }) => (
  <li className="nav-item" style={{ cursor: 'pointer' }}>
    <div onClick={() => setArticlesType(type)} className={`nav-link ${articlesType === type && 'active'}`}>
      {children}
    </div>
  </li>
)

export default ArticleNavMenuItem
