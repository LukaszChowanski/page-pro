/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from 'react'
import styled from 'styled-components'
import Post from '../Post/Post'
import { IPost } from '../../utils/declarations'

export const UserPosts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`
type Props = {
  posts: IPost[] | null
  deletePost: (id: number) => void
}

const PostsList = React.forwardRef(
  (
    { posts, deletePost }: Props,
    ref: React.Ref<HTMLDivElement>
  ): React.ReactElement => {
    return (
      <UserPosts ref={ref}>
        {posts &&
          posts.map(item => (
            <Post key={item.id} item={item} deleteData={deletePost} />
          ))}
      </UserPosts>
    )
  }
)
PostsList.displayName = 'PostsList'
export default React.memo(PostsList)
