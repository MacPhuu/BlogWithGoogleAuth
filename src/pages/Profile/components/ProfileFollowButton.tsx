import { profileActions } from '@/actions/profile'
import { IProfile } from '@/types/models/IProfile'
import React, { useState } from 'react'

interface ProfileFollowButtonProps {
  profile: IProfile
}

const ProfileFollowButton: React.FC<ProfileFollowButtonProps> = ({ profile }) => {
  const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false)

  const handleFollowButtonClick = () => {
    setIsLoadingFollow(true)
    const onFinally = () => setIsLoadingFollow(false)

    if (profile.following) {
      profileActions.unfollowUser(profile.username, { onFinally })
      return
    }
    profileActions.followUser(profile.username, { onFinally })
  }

  return (
    <button
      disabled={isLoadingFollow}
      onClick={handleFollowButtonClick}
      className={`btn btn-sm ${profile.following ? `btn-secondary` : `btn-outline-secondary`} action-btn`}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
    </button>
  )
}

export default ProfileFollowButton
