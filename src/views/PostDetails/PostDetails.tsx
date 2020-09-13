import React, { useState, useCallback, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import AddCommentForm from '../../components/Forms/AddCommentForm/AddCommentForm'
import PageHeader from '../../components/PageHeader/PageHeader'
import { uploadData } from '../../store/actions'
import {
  PostDataType,
  IComment,
  DataToUpload,
  DispatchType
} from '../../utils/declarations'
import { FlexContainer, Title } from './style'
import { RootState } from '../../store/reducers'
import PageTemplate from '../../Templates/PageTemplate/PageTemplate'
import {
  getUserName,
  getPostTitle,
  getPostBody,
  getComments
} from '../../store/selectors'
import CommentsSection from '../../components/CommentsSection/CommentsSection'
import useScrollToEndOfRef from '../../hook/useScrollToEndOfRef'

type RouterProps = {
  userId: string
  postId: string
}
type StateProps = {
  name: string
  title: string
  body: string
  comments: IComment[]
}
type DispatchProps = {
  uploadComment: (dataType: PostDataType, data: DataToUpload) => void
}

type Props = StateProps & DispatchProps

const PostDetails = ({
  uploadComment,
  name: userName,
  title,
  body: postBody,
  comments
}: Props): React.ReactElement => {
  const [formVisibility, setFormVisibility] = useState(false)
  const [commentVisibility, setCommentVisibility] = useState(false)
  const commentListRef = useRef<HTMLElement>(null)

  const showForm = useCallback(() => setFormVisibility(true), [])
  const hideForm = useCallback(() => setFormVisibility(false), [])

  const handleCommentsVisibility = useCallback(
    () => setCommentVisibility(!commentVisibility),
    [commentVisibility]
  )
  // should use useCallback for uploadCommnet function?

  useScrollToEndOfRef(commentListRef, comments)

  return (
    <PageTemplate>
      <FlexContainer>
        <PageHeader name={userName} />
        <Title>{title}</Title>
        <p>{postBody}</p>
        <CommentsSection
          ref={commentListRef}
          isVisible={commentVisibility}
          changeVisibility={handleCommentsVisibility}
          comments={comments}
          handleAddCommentButton={showForm}
        />
      </FlexContainer>

      {formVisibility && (
        <AddCommentForm submit={uploadComment} onCancel={hideForm} />
      )}
    </PageTemplate>
  )
}
const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<RouterProps>
): StateProps => {
  const { userId, postId } = ownProps.match.params

  return {
    name: getUserName(state, userId),
    title: getPostTitle(state, postId),
    body: getPostBody(state, postId),
    comments: getComments(state)
  }
}
const mapDispatchToProps = (dispatch: DispatchType): DispatchProps => ({
  uploadComment: (dataType: PostDataType, data: DataToUpload): void =>
    dispatch(uploadData(dataType, data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // {
  //   uploadComment: uploadData
  // }
)(PostDetails)