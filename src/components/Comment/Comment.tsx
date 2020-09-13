import React from 'react'
import { CommentsItem, Header, Title, Email } from './style'
import { IComment } from '../../utils/declarations'

type Props = {
  item: IComment
}
const Comment = ({
  item: { name, body, email }
}: Props): React.ReactElement => {
  const comment = new Array(3).fill(body)
  return (
    <CommentsItem>
      <Header>
        <Title>{name}</Title>
        <Email>{email}</Email>
      </Header>
      <p>{comment}</p>
    </CommentsItem>
  )
}

export default Comment
