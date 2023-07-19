import { commentActions } from '@/actions/comment'
import { IComment } from '@/types/models/IComment'
import { useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import PostCommentForm from './PostCommentForm'

interface ArticleCommentsSectionProps {
  slug: string
}

const ArticleCommentsSection: React.FC<ArticleCommentsSectionProps> = ({ slug }) => {
  const [comments, setComments] = useState<IComment[]>([])
  const [isFetchingComment, setIsFetchingComments] = useState<boolean>(false)

  const fetchArticleComments = (slug: string) => {
    setIsFetchingComments(true)
    commentActions.getComments(slug, {
      onSuccess: setComments,
      onFinally: () => setIsFetchingComments(false),
    })
  }

  useEffect(() => {
    fetchArticleComments(slug)
  }, [])

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <PostCommentForm />
        {comments.length > 0 ? (
          comments.map(comment => <CommentItem comment={comment} key={`comment-${comment.id}`} />)
        ) : (
          <div>This article does not have any comments yet!</div>
        )}
      </div>
    </div>
  )
}

export default ArticleCommentsSection
