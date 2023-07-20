import { commentActions } from '@/actions/comment'
import { ROUTER } from '@/configs/router'
import { IComment } from '@/types/models/IComment'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

interface CommentItemProps {
  comment: IComment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const authorURL = `${ROUTER.PROFILE_BASE}/${comment.author.username}`
  const { slug } = useParams()
  const handleDeleteComment = () => {
    if (!slug) return
    commentActions.deleteComment(slug, comment.id.toString(), {
      onSuccess: () => window.location.reload(),
    })
  }

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={authorURL} className="comment-author">
          <img src={comment.author.image} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link to={authorURL} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{comment.createdAt}</span>
        <span className="mod-options">
          <i className="ion-trash-a" onClick={handleDeleteComment}></i>
        </span>
      </div>
    </div>
  )
}

export default CommentItem
