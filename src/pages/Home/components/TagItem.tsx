import React from 'react'

interface TagItemProps {
  tag: string
  setSelectedTag: React.Dispatch<React.SetStateAction<string | undefined>>
  setArticleType: React.Dispatch<React.SetStateAction<string>>
}

const TagItem: React.FC<TagItemProps> = ({ tag, setSelectedTag, setArticleType }) => {
  const handleTagClick = () => {
    setSelectedTag(tag)
    setArticleType(tag)
  }

  return (
    <li onClick={handleTagClick} className="tag-pill tag-default cursor-pointer">
      {tag}
    </li>
  )
}

export default TagItem
