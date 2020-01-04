import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deletePost } from '../../actions'
import { PostPropTypes } from '../../PropTypes'
import { PostsItem, Delete, PostTitle, Details, StyledLink } from './style'

const Posts = ({ item: { userId, id, title }, deletePost }) => {
  return (
    <PostsItem>
      <Delete onClick={() => deletePost(id)} />
      <StyledLink to={`/user/${userId}/${id}`}>
        <PostTitle>{title}</PostTitle>
      </StyledLink>
      <Details />
    </PostsItem>
  )
}

Posts.propTypes = {
  deletePost: PropTypes.func.isRequired,
  item: PostPropTypes.isRequired
}
PostPropTypes.whyDidYouRender = true
export default connect(
  null,
  { deletePost }
)(Posts)
