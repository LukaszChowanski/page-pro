import React from 'react'
import { PostsItem, Delete, PostTitle, Details, StyledLink } from './style'
import { IPost } from '../../utils/declarations'

type Props = {
  item: IPost
  deleteData: (id: number) => void
}
const Post = ({
  item: { userId, id, title },
  deleteData
}: Props): React.ReactElement => {
  return (
    <PostsItem>
      <Delete data-testid="trash" onClick={(): void => deleteData(id)} />
      <StyledLink to={`/user/${userId}/${id}`}>
        <PostTitle>{title}</PostTitle>
      </StyledLink>
      <Details />
    </PostsItem>
  )
}

export default React.memo(Post)
