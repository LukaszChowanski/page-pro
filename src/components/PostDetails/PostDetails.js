import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AddCommentForm from '../Forms/AddCommentForm'
import PostComments from '../PostComment/PostComments'
import PostHeader from '../PostHeader/PostHeader'
import { getData, uploadData } from '../../actions'
import { FlexContainer, Title, CommentsButton } from './style'

const PostDetails = ({
  match: {
    params: { postId, userId }
  },
  getData: getCommentData,
  uploadData: uploadCommentData,
  name: UserName,
  title,
  body: postBody
}) => {
  const [commentsIsVisible, setCommentVisible] = useState(false)
  const [addCommentActive, setAddComment] = useState(false)

  useEffect(() => {
    getCommentData('comments', postId)
  }, [])

  const handleAddCommentButton = useCallback(() => {
    setAddComment(!addCommentActive)
  }, [addCommentActive])

  const showComments = useCallback(() => {
    setCommentVisible(!commentsIsVisible)
  }, [commentsIsVisible])

  const onSubmit = ({ name, email, body }) => {
    const comment = {
      postId: parseInt(postId, 10),
      name,
      email,
      body
    }

    uploadCommentData('comments', comment)
    handleAddCommentButton()
  }
  const userPostBody = new Array(10).fill(postBody, 0, 10)

  return (
    <React.Fragment>
      <FlexContainer>
        <PostHeader whereTo={`/user/${userId}`} name={UserName} />

        <FlexContainer>
          <Title>{title}</Title>
          <p>{userPostBody}</p>

          {commentsIsVisible ? (
            <PostComments
              showComments={showComments}
              handleAddCommentButton={handleAddCommentButton}
            />
          ) : (
            <CommentsButton onClick={showComments}>
              Show Comments
            </CommentsButton>
          )}
        </FlexContainer>
      </FlexContainer>
      {addCommentActive && (
        <AddCommentForm onSubmit={onSubmit} onCancel={handleAddCommentButton} />
      )}
    </React.Fragment>
  )
}

PostDetails.propTypes = {
  uploadData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    })
  }).isRequired,
  body: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => {
  const { users, posts } = state.data
  const { userId, postId } = ownProps.match.params
  return {
    name: users[userId - 1].name,
    title: posts.find(item => item.id === Number(postId)).title,
    body: posts.find(item => item.id === Number(postId)).body
  }
}
PostDetails.whyDidYouRender = true
export default connect(
  mapStateToProps,
  { getData, uploadData }
)(PostDetails)
