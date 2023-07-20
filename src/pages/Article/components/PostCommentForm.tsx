import { commentActions } from '@/actions/comment'
import { useAuthContext } from '@/hooks/context'
import { FormEvent, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostCommentForm = () => {
  const { slug } = useParams()
  const [isPostingComment, setIsPostingComment] = useState(false)

  const {
    state: { currentUser },
  } = useAuthContext()

  const commentBodyRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    if (!slug) return
    e.preventDefault()
    setIsPostingComment(true)
    const commentBody = commentBodyRef.current?.value || ''
    commentActions.createComment(
      slug,
      { comment: { body: commentBody } },
      {
        onSuccess: () => {
          if (commentBodyRef.current) commentBodyRef.current.value = ''
          window.location.reload()
        },
        onFinally: () => setIsPostingComment(false),
      }
    )
  }

  return (
    <form onSubmit={handleSubmitComment} className="card comment-form">
      <div className="card-block">
        <textarea ref={commentBodyRef} className="form-control" placeholder="Write a comment..." rows={8}></textarea>
      </div>
      <div className="card-footer">
        <img src={currentUser?.image || ''} className="comment-author-img" />
        <button className="btn btn-sm btn-primary" disabled={isPostingComment}>
          Post Comment
        </button>
      </div>
    </form>
  )
}

export default PostCommentForm
