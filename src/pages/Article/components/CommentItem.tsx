import { ROUTER } from '@/configs/router'
import { IComment } from '@/types/models/IComment'
import React from 'react'
import { Link } from 'react-router-dom'

interface CommentItemProps {
  comment: IComment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const authorURL = `${ROUTER.PROFILE_BASE}/${comment.author.username}`

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
      </div>
    </div>
  )
}

export default CommentItem
