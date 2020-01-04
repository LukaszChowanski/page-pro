import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Comment from '../Comment/Comment'
import { CommentPropType } from '../../PropTypes'
import { FlexRowContainer, FlexContainer, CommentsButton } from './style'

const PostComments = React.memo(
  ({ showComments, handleAddCommentButton, comments }) => {
    const commentsArray = comments.map(comment => (
      <Comment key={comment.id} item={comment} />
    ))
    return (
      <FlexContainer>
        <FlexRowContainer>
          <CommentsButton onClick={showComments}>Hide comments</CommentsButton>
          <CommentsButton onClick={handleAddCommentButton}>
            Add comment
          </CommentsButton>
        </FlexRowContainer>
        {commentsArray}
      </FlexContainer>
    )
  }
)
PostComments.propTypes = {
  showComments: PropTypes.func.isRequired,
  handleAddCommentButton: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(CommentPropType).isRequired
}
const mapStateToProps = state => {
  const { comments } = state.data
  return {
    comments
  }
}
PostComments.whyDidYouRender = true
export default connect(mapStateToProps)(PostComments)
