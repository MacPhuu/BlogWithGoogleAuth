import React from 'react'

interface TagsListProps {
  tags: string[]
}

const ArticleTagsList: React.FC<TagsListProps> = ({ tags }) => (
  <ul className="tag-list">
    {tags.map(tag => (
      <li
        key={`article-tags-list-tag-${tag}`}
        className="tag-default tag-pill tag-outline ng-binding ng-scope"
        ng-repeat="tag in ::$ctrl.article.tagList"
      >
        {tag}
      </li>
    ))}
  </ul>
)

export default ArticleTagsList
