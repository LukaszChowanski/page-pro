import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getData, uploadData } from '../../actions'
import Posts from '../Posts/Posts'
import AddPostForm from '../Forms/AddPostForm'
import PostHeader from '../PostHeader/PostHeader'
import { PostPropTypes } from '../../PropTypes'
import { PostsContainer, UserPosts } from './style'

const UserDetails = React.memo(
  ({
    match: {
      params: { userId }
    },
    getData,
    uploadData,
    name,
    posts: userPosts
  }) => {
    const [addPostActive, setAddPostActive] = useState(false)

    useEffect(() => {
      getData('posts', userId)
    }, [])

    const handleAddPostButton = useCallback(() => {
      setAddPostActive(!addPostActive)
    }, [addPostActive])

    const onSubmit = ({ title, body }) => {
      const post = {
        userId: Number(userId),
        title,
        body
      }

      uploadData('posts', post)
      handleAddPostButton()
    }

    return (
      <PostsContainer>
        <PostHeader
          whereTo="/"
          name={name}
          buttonHandler={handleAddPostButton}
          addButton
        />

        <UserPosts>
          {userPosts.map(item => (
            <Posts key={item.id} item={item} />
          ))}
        </UserPosts>

        {addPostActive && (
          <AddPostForm onSubmit={onSubmit} onCancel={handleAddPostButton} />
        )}
      </PostsContainer>
    )
  }
)
UserDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    })
  }).isRequired,
  getData: PropTypes.func.isRequired,
  uploadData: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PostPropTypes).isRequired
}
const mapStateToProps = (state, ownProps) => {
  const { users, posts } = state.data
  return {
    name: users[ownProps.match.params.userId - 1].name,
    posts
  }
}
export default connect(mapStateToProps, { getData, uploadData })(UserDetails)
