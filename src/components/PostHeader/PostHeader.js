import React from 'react'
import PropTypes from 'prop-types'
import { Container, Name, Back, StyledLink, AddPost, PlusIcon } from './style'

const PostHeader = React.memo(({ whereTo, name, buttonHandler, addButton }) => {
  return (
    <Container>
      <StyledLink to={whereTo}>
        <Back /> Back
      </StyledLink>

      <Name>{name}</Name>

      {addButton && (
        <AddPost onClick={buttonHandler}>
          <PlusIcon />
        </AddPost>
      )}
    </Container>
  )
})

PostHeader.defaultProps = {
  addButton: false
}
PostHeader.propTypes = {
  whereTo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired,
  addButton: PropTypes.bool
}
PostHeader.whyDidYouRender = true
export default PostHeader
