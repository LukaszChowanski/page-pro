import React, { useState, useCallback, useRef, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { uploadData, deletePost } from '../../store/actions'
import AddPostForm from '../../components/Forms/AddPostForm/AddPostForm'
import PageHeader from '../../components/PageHeader/PageHeader'
import PostsList from '../../components/PostsList/PostsList'
import { RootState } from '../../store/reducers'
import {
  IPost,
  PostDataType,
  DataToUpload,
  DispatchType
} from '../../utils/declarations'
import useScrollToEndOfRef from '../../hook/useScrollToEndOfRef'
import PageTemplate from '../../Templates/PageTemplate/PageTemplate'
import { getUserName, getPosts } from '../../store/selectors'
import { PostsContainer, DelteInfoContainer } from './style'

type RouterProps = {
  userId: string
}
type StateProps = {
  name: string
  posts: IPost[]
}
type DispatchProps = {
  uploadPost: (dataType: PostDataType, data: DataToUpload) => void
  deleteItem: (id: number) => void
}
type Props = StateProps & DispatchProps

const UserDetails = ({
  name,
  posts: userPosts,
  uploadPost,
  deleteItem
}: Props): React.ReactElement => {
  const [formVisibility, setformVisibility] = useState(false)
  const [isPostDeleted, setIsPostDeleted] = useState(false)
  const postsListRef = useRef<HTMLDivElement>(null)

  useScrollToEndOfRef(postsListRef, userPosts)

  const deleteHandler = useCallback((id: number) => {
    deleteItem(id)
    setIsPostDeleted(true)
  }, [])

  useEffect(() => {
    if (isPostDeleted) {
      const timer = setTimeout(() => {
        setIsPostDeleted(false)
      }, 2000)
      return (): void => clearTimeout(timer)
    }
  }, [isPostDeleted])

  const showForm = useCallback(() => {
    setformVisibility(true)
  }, [])
  const hideForm = useCallback(() => {
    setformVisibility(false)
  }, [])

  return (
    <PageTemplate>
      <PostsContainer>
        <PageHeader name={name} addPostButtonHandler={showForm} />
        <PostsList
          ref={postsListRef}
          posts={userPosts}
          deletePost={deleteHandler}
        />

        {isPostDeleted && (
          <DelteInfoContainer>
            <div>Post deleted successfully</div>
          </DelteInfoContainer>
        )}

        {formVisibility && (
          // should memoize uploadPost function?
          <AddPostForm onCancel={hideForm} submit={uploadPost} />
        )}
      </PostsContainer>
    </PageTemplate>
  )
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<RouterProps>
): StateProps => {
  const { userId } = ownProps.match.params

  return {
    name: getUserName(state, userId),
    posts: getPosts(state)
  }
}
const mapDispatchToProps = (dispatch: DispatchType): DispatchProps => ({
  uploadPost: (dataType: PostDataType, data: DataToUpload): void =>
    dispatch(uploadData(dataType, data)),
  deleteItem: (id: number): void => dispatch(deletePost(id))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // {
  //   uploadPost: uploadData,
  //   deleteItem: deletePost
  // }
)(UserDetails)
