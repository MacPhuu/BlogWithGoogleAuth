import { profileActions } from '@/actions/profile'
import { IProfile } from '@/types/models/IProfile'
import React, { useState } from 'react'

interface ArticleFollowButtonProps {
  author: IProfile
}
const ArticleFollowButton: React.FC<ArticleFollowButtonProps> = ({ author }) => {
  const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false)

  const handleFollowButtonClick = () => {
    setIsLoadingFollow(true)
    const onFinally = () => setIsLoadingFollow(false)

    if (author.following) {
      profileActions.unfollowUser(author.username, { onFinally })

      return
    }
    profileActions.followUser(author.username, { onFinally })
  }

  return (
    <button
      disabled={isLoadingFollow}
      onClick={handleFollowButtonClick}
      className={`btn btn-sm ${author.following ? `btn-secondary` : `btn-outline-secondary`} action-btn`}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {author.following ? 'Unfollow' : 'Follow'} {author.username}
    </button>
  )
}

export default ArticleFollowButton
