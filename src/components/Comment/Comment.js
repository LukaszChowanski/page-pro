import React from 'react'
import { CommentPropType } from '../../PropTypes'
import { CommentsItem, Header, Title, Email } from './style'

const Comment = React.memo(({ item: { name, email, body } }) => {
  const comm = new Array(3).fill(body)
  return (
    <CommentsItem>
      <Header>
        <Title>{name}</Title>
        <Email>{email}</Email>
      </Header>
      <p>{comm}</p>
    </CommentsItem>
  )
})
Comment.propTypes = {
  item: CommentPropType.isRequired
}
Comment.whyDidYouRender = true
export default Comment
