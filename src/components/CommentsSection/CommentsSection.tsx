import React from 'react'
import Comment from '../Comment/Comment'
import { FlexContainer, FlexRowContainer, CommentsButton } from './style'
import { IComment as PostComment } from '../../utils/declarations'

type Props = {
  isVisible: boolean
  changeVisibility: () => void
  handleAddCommentButton: () => void
  comments: PostComment[]
}

const CommentsSection = React.forwardRef(
  (
    { handleAddCommentButton, comments, isVisible, changeVisibility }: Props,
    ref: React.Ref<HTMLElement>
  ): React.ReactElement => {
    return (
      <FlexContainer>
        {isVisible ? (
          <FlexContainer ref={ref}>
            <FlexRowContainer>
              <CommentsButton onClick={changeVisibility}>
                Hide comments
              </CommentsButton>
              <CommentsButton onClick={handleAddCommentButton}>
                Add comment
              </CommentsButton>
            </FlexRowContainer>
            {comments &&
              comments.map(comment => (
                <Comment key={comment.id} item={comment} />
              ))}
          </FlexContainer>
        ) : (
            <CommentsButton onClick={changeVisibility}>
              Show Comments
            </CommentsButton>
          )}
      </FlexContainer>
    )
  }
)
CommentsSection.displayName = 'CommentsSection'
export default React.memo(CommentsSection)
