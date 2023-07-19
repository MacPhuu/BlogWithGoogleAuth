import { tagActions } from '@/actions/tag'
import PageLoader from '@/components/PageLoader'
import { useEffect, useState } from 'react'
import TagItem from './TagItem'

interface TagListProps {
  setSelectedTag: React.Dispatch<React.SetStateAction<string | undefined>>
  setArticlesType: React.Dispatch<React.SetStateAction<string>>
}

const TagList: React.FC<TagListProps> = ({ setSelectedTag, setArticlesType }) => {
  const [tags, setTags] = useState<string[]>([])
  const [isFetchingTags, setIsFetchingTags] = useState<boolean>(false)

  useEffect(() => {
    setIsFetchingTags(true)
    tagActions.getAllTags({
      onSuccess: setTags,
      onFinally: () => setIsFetchingTags(false),
    })
  }, [])

  if (isFetchingTags) {
    return <PageLoader />
  }

  if (tags.length === 0) {
    return <p>No tags found!</p>
  }

  return (
    <ul className="tag-list">
      {tags.map((tag, idx) => (
        <TagItem setSelectedTag={setSelectedTag} setArticleType={setArticlesType} key={`tag-list-${idx}`} tag={tag} />
      ))}
    </ul>
  )
}

export default TagList
